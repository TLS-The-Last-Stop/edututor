package com.tls.edututor.exam.question.dto.response;

import com.tls.edututor.exam.option.dto.response.TestOptionResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.tls.edututor.exam.question.entity.Question;

@Getter
@Setter
public class TestQuestionResponse {
  private Long questionId;
  private String content;
  private String passage;
  private String commentary;
  private String type;
  private Integer level;
  private List<TestOptionResponse> options;

  public TestQuestionResponse(Question question) {
    this.questionId = question.getId();
    this.content = question.getContent();
    this.passage = question.getPassage();
    this.commentary = question.getCommentary();
    this.type = question.getType().name();
    this.level = question.getLevel();
    this.options = question.getOptions().stream()
            .map(TestOptionResponse::new)
            .toList();
  }
}