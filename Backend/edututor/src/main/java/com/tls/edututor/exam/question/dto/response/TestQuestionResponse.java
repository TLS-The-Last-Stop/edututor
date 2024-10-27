package com.tls.edututor.exam.question.dto.response;

import com.tls.edututor.exam.option.dto.response.OptionResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TestQuestionResponse {
  private Long id;
  private String content;
  private String type;
  private List<OptionResponse> options;


}
