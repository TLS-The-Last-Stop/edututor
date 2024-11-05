package com.tls.edututor.exam.question.dto.request;

import com.tls.edututor.exam.option.dto.request.OptionRegisterRequest;
import com.tls.edututor.exam.question.entity.QuestionType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionRegisterRequest {
  private String content;
  private String passage;
  private String commentary;
  private QuestionType type;
  private String answerText;
  private Integer level;
  private List<OptionRegisterRequest> options;
}
