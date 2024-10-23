package com.tls.edututor.exam.question.repository;

import com.tls.edututor.exam.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
