package com.tls.edututor.exam.useransewer.repositroy;

import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
}
