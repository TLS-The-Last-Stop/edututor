package com.tls.edututor.issue.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueStatusUpdateRequest {
  private Long issueId;
  private Long status;
  private String reason;
}
