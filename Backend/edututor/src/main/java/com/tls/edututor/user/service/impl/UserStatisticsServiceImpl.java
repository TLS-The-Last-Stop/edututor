package com.tls.edututor.user.service.impl;

import com.tls.edututor.user.dto.response.TeacherStudentCount;
import com.tls.edututor.user.dto.response.UserSignupStats;
import com.tls.edututor.user.dto.response.UserStatisticsResponse;
import com.tls.edututor.user.repository.UserRepository;
import com.tls.edututor.user.service.UserStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserStatisticsServiceImpl implements UserStatisticsService {

  private final UserRepository userRepository;
  private final RedisTemplate<String, Object> redisTemplate;
  private static final String STATS_CACHE_KEY = "user:statistics";
  private static final Long CACHE_TTL_HOURS = 1L;

  @Cacheable(value = "userStats", key = "'monthly'")
  public UserStatisticsResponse getUserStatistics() {
    UserStatisticsResponse cached = (UserStatisticsResponse) redisTemplate.opsForValue().get(STATS_CACHE_KEY);

    if (cached != null) return cached;

    // 캐시가 없다면 db에서 조회
    UserStatisticsResponse response = calculateStatistics();
    redisTemplate.opsForValue().set(STATS_CACHE_KEY, response, CACHE_TTL_HOURS, TimeUnit.HOURS);

    return response;
  }

  public void refreshStatistics() {
    UserStatisticsResponse newStats = calculateStatistics();
    redisTemplate.opsForValue()
            .set(STATS_CACHE_KEY, newStats, CACHE_TTL_HOURS, TimeUnit.HOURS);
  }

  public UserStatisticsResponse calculateStatistics() {
    UserStatisticsResponse response = new UserStatisticsResponse();

    // 전체 통계
    Long teacherCount = userRepository.countByRole("TE");
    Long studentCount = userRepository.countByRole("SU");

    response.setTotalTeachers(teacherCount);
    response.setTotalStudents(studentCount);
    response.setTotalUsers(teacherCount + studentCount);

    // 월별 가입자
    List<UserSignupStats> monthlyStats = userRepository.getMonthlySignupStats();
    List<UserStatisticsResponse.MonthlySignup> monthlySignups = monthlyStats.stream()
            .map(stat -> {
              UserStatisticsResponse.MonthlySignup signup = new UserStatisticsResponse.MonthlySignup();
              signup.setYearMonth(String.format("%d-%02d", stat.getYear(), stat.getMonth()));
              signup.setCount(stat.getCount());
              return signup;
            }).collect(Collectors.toList());

    response.setMonthlySignups(monthlySignups);

    // 선생님별 학생 수
    List<TeacherStudentCount> teacherStudentCounts = userRepository.getTeacherStudentCounts();
    response.setTeacherStudentCounts(teacherStudentCounts);

    return response;
  }
}
