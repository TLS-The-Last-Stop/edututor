package com.tls.edututor.user.repository;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

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
}
