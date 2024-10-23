package com.tls.edututor.exam.option.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OptionRegisterRequest {
  private String content;
  private Boolean isCorrect;
}