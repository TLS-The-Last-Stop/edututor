package com.tls.edututor.report.repository;

import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository2 extends JpaRepository<UserAnswer, Long> {
  List<UserAnswer> findByUserTestId(Long id);
}