package com.tls.edututor.user.repository;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.user.dto.response.*;
import com.tls.edututor.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  @EntityGraph(attributePaths = {"classroom", "classroom.school"})
  Optional<User> findByLoginId(String loginId);

  Optional<User> findByEmail(String email);

  Optional<User> findByLoginIdAndEmail(String longinId, String email);

  boolean existsByLoginId(String loginId);

  @EntityGraph(attributePaths = {"classroom"})
  List<User> findByClassroomIdAndRole(Long classroomId, String role);

  Optional<User> findByIdAndClassroom(Long id, Classroom classroom);

  Page<User> findAllBy(Pageable pageable);

  @Query("select count(u) from User u where u.role = :role")
  Long countByRole(@Param("role") String role);

  @Query("SELECT new com.tls.edututor.user.dto.response.YearlySignupStats(" +
          "YEAR(u.createdAt), COUNT(u)) " +
          "FROM User u " +
          "WHERE u.role != 'AD' " +
          "GROUP BY YEAR(u.createdAt) " +
          "ORDER BY YEAR(u.createdAt) DESC")
  List<YearlySignupStats> getYearlySignupStats();

  @Query("SELECT new com.tls.edututor.user.dto.response.MonthlySignupStats(" +
          "YEAR(u.createdAt), MONTH(u.createdAt), COUNT(u)) " +
          "FROM User u " +
          "WHERE u.role != 'AD' " +
          "GROUP BY YEAR(u.createdAt), MONTH(u.createdAt) " +
          "ORDER BY YEAR(u.createdAt) DESC, MONTH(u.createdAt) DESC")
  List<MonthlySignupStats> getMonthlySignupStats();

  @Query("select new com.tls.edututor.user.dto.response.DailySignupStats(" +
          "cast(date_format(u.createdAt, '%y-%m-%d') as string), count(u)) " +
          "from User u " +
          "where u.role != 'AD' " +
          "group by date_format(u.createdAt, '%y-%m-%d') " +
          "order by date_format(u.createdAt, '%y-%m-%d') desc")
  List<DailySignupStats> getDailySignupStats();

  @Query(value =
          "SELECT " +
                  "u.role as role, " +  // as로 별칭 지정
                  "(SELECT COUNT(*) FROM user u2 WHERE u2.role = u.role) as total_count, " +
                  "(SELECT COUNT(*) FROM user u3 WHERE u3.role = u.role AND u3.is_deleted = true) as deleted_count, " +
                  "DATE_FORMAT(u.updated_at, '%y-%m-%d') as last_deleted_at " +
                  "FROM user u " +
                  "WHERE u.role != 'AD' " +
                  "AND u.is_deleted = true " +
                  "GROUP BY u.role",
          nativeQuery = true)
  List<UserDeletedStatsInterface> getDeletedUserStats();
}
