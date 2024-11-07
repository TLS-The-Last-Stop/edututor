package com.tls.edututor.board.board.dto.response;

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
  private LocalDateTime createAt;

  public static BoardResponse dto(Board board) {
    return new BoardResponse(
            board.getId(),
            board.getCategory().getName(),
            board.getTitle(),
            board.getContent(),
            board.getCreatedAt()
    );
  }
}