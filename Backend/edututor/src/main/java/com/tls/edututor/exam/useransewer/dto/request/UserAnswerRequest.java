package com.tls.edututor.exam.useransewer.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserAnswerRequest {
  private Long questionId;
  private String answer;
}
