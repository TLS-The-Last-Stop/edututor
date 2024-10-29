package com.tls.edututor.exam.testpaper.dto.response;

import com.tls.edututor.exam.question.dto.response.TestQuestionResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class StudentTestPaperResponse {
  private Long testPaperId;
  private String title;
  private List<TestQuestionResponse> questions;

  public StudentTestPaperResponse(Long testPaperId, String title, List<TestQuestionResponse> questions) {
    this.testPaperId = testPaperId;
    this.title = title;
    this.questions = questions;
  }
}
