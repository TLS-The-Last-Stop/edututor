package com.tls.edututor.exam.question.dto.request;

import com.tls.edututor.exam.option.dto.request.OptionRegisterRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionRegisterRequest {
  private String content;
  private String passage;
  private String commentary;
  private List<OptionRegisterRequest> options;
}
