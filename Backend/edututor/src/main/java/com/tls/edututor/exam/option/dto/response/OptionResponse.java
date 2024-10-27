package com.tls.edututor.exam.option.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OptionResponse {
  private Long id;
  private String content;
  private Boolean isCorrect;
}