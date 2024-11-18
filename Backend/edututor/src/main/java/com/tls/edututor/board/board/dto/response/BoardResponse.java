package com.tls.edututor.board.board.dto.response;

import com.tls.edututor.board.answer.entity.Answer;
import com.tls.edututor.board.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
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

  public static BoardResponse from(Board board, String username, Answer answer) {
    return BoardResponse.builder()
            .boardId(board.getId())
            .categoryName(board.getCategory().getName())
            .title(board.getTitle())
            .content(board.getContent())
            .createdAt(board.getCreatedAt())
            .username(username)
            .inquiryAnswer(answer != null ? answer.getContent() : null)
            .hasAnswer(answer != null)
            .build();
  }
}