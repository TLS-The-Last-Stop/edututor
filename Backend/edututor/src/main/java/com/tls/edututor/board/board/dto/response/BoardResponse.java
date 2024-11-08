package com.tls.edututor.board.board.dto.response;

import com.tls.edututor.board.answer.entity.Answer;
import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponse {
  private Long boardId;
  private String categoryName;
  private String title;
  private String content;
  private LocalDateTime createdAt;
  private String username;
  private String inquiryAnswer;
  private boolean hasAnswer;

  public static BoardResponse dto(Board board, String username, Answer answer) {
    return new BoardResponse(
            board.getId(),
            board.getCategory().getName(),
            board.getTitle(),
            board.getContent(),
            board.getCreatedAt(),
            username,
            answer != null ? answer.getContent() : null,
            answer != null
    );
  }
}