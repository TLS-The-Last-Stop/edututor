package com.tls.edututor.board.answer.repository;

import com.tls.edututor.board.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
  Answer findByBoardId(Long boardId);
}