package com.tls.edututor.exam.option.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OptionResponse {
  private Long id;
  private String content;
  private boolean isCorrect;
}