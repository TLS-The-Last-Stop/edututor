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
  private int testPaperStatus;
  private String title;
  private List<QuestionResponse> questions;

  public TestPaperResponse(Long testPaperId, int testPaperStatus, String title, List<QuestionResponse> questions) {
    this.testPaperId = testPaperId;
    this.testPaperStatus = testPaperStatus;
    this.title = title;
    this.questions = questions;
  }
}
