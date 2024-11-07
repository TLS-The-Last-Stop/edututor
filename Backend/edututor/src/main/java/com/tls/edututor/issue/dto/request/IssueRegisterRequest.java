package com.tls.edututor.issue.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueRegisterRequest {

  private Long questionId;

  private String content;
}
