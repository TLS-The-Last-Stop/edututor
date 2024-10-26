package com.tls.edututor.user.repository;

import com.tls.edututor.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  @EntityGraph(attributePaths = {"classroom", "classroom.school"})
  Optional<User> findByLoginId(String loginId);

  boolean existsByLoginId(String loginId);
}
