package com.tls.edututor.exam.useransewer.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAnswerRequest {
  private Long questionId;
  private String answer;
}
