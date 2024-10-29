package com.tls.edututor.exam.testpaper.dto.response;

import com.tls.edututor.exam.question.dto.response.QuestionResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class TestPaperResponse {
  private Long testPaperId;
  private String title;
  private List<QuestionResponse> questions;

  public TestPaperResponse(Long testPaperId, String title, List<QuestionResponse> questions) {
    this.testPaperId = testPaperId;
    this.title = title;
    this.questions = questions;
  }
}
