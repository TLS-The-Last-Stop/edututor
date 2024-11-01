package com.tls.edututor.report.repository;

import com.tls.edututor.exam.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository2 extends JpaRepository<Question, Integer> {
  List<Question> findByTestPaperId(Long testPaperId);

  long countByTestPaperId(Long testPaperId);
}