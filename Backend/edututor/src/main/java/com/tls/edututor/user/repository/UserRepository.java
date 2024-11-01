package com.tls.edututor.user.repository;

import com.tls.edututor.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  @EntityGraph(attributePaths = {"classroom", "classroom.school"})
  Optional<User> findByLoginIdAndIsDeleted(String loginId, boolean isDeleted);

  boolean existsByLoginIdAndIsDeleted(String loginId, boolean isDeleted);

  @EntityGraph(attributePaths = {"classroom"})
  List<User> findByClassroomIdAndRole(Long classroomId, String role);
}
