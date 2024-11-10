package com.tls.edututor.user.repository;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.user.dto.response.TeacherStudentCount;
import com.tls.edututor.user.dto.response.UserSignupStats;
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

  @Query("select function('YEAR', u.createdAt) as year, " +
          "function('MONTH', u.createdAt) as month, " +
          "count(u) as count " +
          "from User u " +
          "group by function('YEAR', u.createdAt), function('MONTH', u.createdAt) " +
          "order by year desc, month desc")
  List<UserSignupStats> getMonthlySignupStats();

  @Query("SELECT new com.tls.edututor.user.dto.response.TeacherStudentCount(" +
          "t.id, t.username, COUNT(s)) " +
          "FROM User t " +
          "LEFT JOIN User s ON s.classroom.id = t.classroom.id AND s.role = 'SU' " +
          "WHERE t.role = 'TE' AND t.isDeleted = false " +
          "GROUP BY t.id, t.username")
  List<TeacherStudentCount> getTeacherStudentCounts();
}
