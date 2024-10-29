package com.tls.edututor.report.repository;

import com.tls.edututor.exam.usertest.entity.UserTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTestRepository2 extends JpaRepository<UserTest, Long> {
  @Query("SELECT ut FROM UserTest ut JOIN FETCH ut.shareTest WHERE ut.shareTest.id = :shareTestId")
  List<UserTest> findByShareTestId(Long shareTestId);
}