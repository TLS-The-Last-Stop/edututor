package com.tls.edututor.issue.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Data
public class IssueDetailResponse {
  private Long issueId;
  private Long questionId;
  private String content;
  private Long status;
  private String reason;
  private LocalDateTime createdAt;
  private String questionContent;
  private List<IssueOptionResponse> options;
}
