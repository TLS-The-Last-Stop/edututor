package com.tls.edututor.exam.usertest.repository;

import com.tls.edututor.exam.usertest.entity.UserTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTestRepository extends JpaRepository<UserTest, Long> {
}
