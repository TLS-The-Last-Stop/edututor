package com.tls.edututor.board.board.dto.request;

import com.tls.edututor.common.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardRequest {
  private String title;
  private String content;
}