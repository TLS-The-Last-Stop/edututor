package com.tls.edututor.issue.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class IssueResponse {
  private Long id;
  private Long questionId;
  private String content;
  private Long status;
  private LocalDateTime createdAt;
  private String reason;


  public IssueResponse(Long id, Long questionId, String content, Long status, LocalDateTime createdAt) {
    this.id = id;
    this.questionId = questionId;
    this.content = content;
    this.status = status;
    this.createdAt = createdAt;
  }
}
