package com.tls.edututor.user.service.impl;

import com.tls.edututor.user.dto.response.*;
import com.tls.edututor.user.repository.UserRepository;
import com.tls.edututor.user.service.UserStatisticsService;
import lombok.RequiredArgsConstructor;
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

  public UserStatisticsResponse getUserStatistics() {
    UserStatisticsResponse cached = (UserStatisticsResponse) redisTemplate.opsForValue().get(STATS_CACHE_KEY);

    if (cached != null) return cached;

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

    UserStatisticsResponse.SignupStats signupStats = new UserStatisticsResponse.SignupStats();

    List<YearlySignupStats> yearlySignupStats = userRepository.getYearlySignupStats();
    List<UserStatisticsResponse.YearlySignup> yearlySignups = yearlySignupStats.stream()
            .map(stat -> {
              UserStatisticsResponse.YearlySignup yearlySignup = new UserStatisticsResponse.YearlySignup();
              yearlySignup.setYear(stat.getYear());
              yearlySignup.setCount(stat.getCount());
              return yearlySignup;
            }).collect(Collectors.toList());
    signupStats.setYearlySignups(yearlySignups);

    List<MonthlySignupStats> monthlySignupStats = userRepository.getMonthlySignupStats();
    List<UserStatisticsResponse.MonthlySignup> monthlySignups = monthlySignupStats.stream()
            .map(stat -> {
              UserStatisticsResponse.MonthlySignup monthlySignup = new UserStatisticsResponse.MonthlySignup();
              monthlySignup.setYearMonth(String.format("%d-%02d", stat.getYear(), stat.getMonth()));
              monthlySignup.setCount(stat.getCount());
              return monthlySignup;
            }).collect(Collectors.toList());
    signupStats.setMonthlySignups(monthlySignups);

    List<DailySignupStats> dailySignupStats = userRepository.getDailySignupStats();
    List<UserStatisticsResponse.DailySignup> dailySignups = dailySignupStats.stream()
            .limit(30)
            .map(stat -> {
              UserStatisticsResponse.DailySignup dailySignup = new UserStatisticsResponse.DailySignup();
              dailySignup.setDate(stat.getSignupDate());
              dailySignup.setCount(stat.getCount());
              return dailySignup;
            }).collect(Collectors.toList());
    signupStats.setDailySignups(dailySignups);

    response.setSignupStats(signupStats);

    UserStatisticsResponse.RatioStats ratioStats = new UserStatisticsResponse.RatioStats();
    long teacherCount = userRepository.countByRole("TE");
    long studentCount = userRepository.countByRole("SU");
    long totalUsers = teacherCount + studentCount;

    ratioStats.setTotalUsers(totalUsers);
    ratioStats.setTeacherCount(teacherCount);
    ratioStats.setStudentCount(studentCount);
    ratioStats.setTeacherRatio(totalUsers > 0 ? (double) teacherCount / totalUsers * 100 : 0);
    ratioStats.setStudentRatio(totalUsers > 0 ? (double) studentCount / totalUsers * 100 : 0);

    response.setRatioStats(ratioStats);

    List<UserDeletedStatsInterface> interfaces = userRepository.getDeletedUserStats();
    UserStatisticsResponse.DeletedStats deletedStats = new UserStatisticsResponse.DeletedStats();

    List<UserDeletedStats> deletedUserStats = interfaces.stream()
            .map(i -> new UserDeletedStats(
                    i.getRole(),
                    i.getTotalCount(),
                    i.getDeletedCount(),
                    i.getLastDeletedAt()))
            .collect(Collectors.toList());

    deletedUserStats.forEach(stat -> {
      UserStatisticsResponse.RoleDeletedStats roleDeletedStats = new UserStatisticsResponse.RoleDeletedStats();
      roleDeletedStats.setRole(stat.getRole());
      roleDeletedStats.setTotalCount(stat.getTotalCount());
      roleDeletedStats.setDeletedCount(stat.getDeletedCount());
      roleDeletedStats.setDeleteRate(stat.getDeleteRate());

      if ("TE".equals(stat.getRole())) deletedStats.setTeacher(roleDeletedStats);
      else if ("SU".equals(stat.getRole())) deletedStats.setStudent(roleDeletedStats);
    });

    response.setDeletedStats(deletedStats);

    return response;
  }

}
