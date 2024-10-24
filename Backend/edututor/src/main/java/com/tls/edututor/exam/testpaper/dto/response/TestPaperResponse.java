package com.tls.edututor.exam.testpaper.dto.response;

import com.tls.edututor.exam.question.dto.response.QuestionResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestPaperResponse {
  private Long testPaperId;
  private String title;
  private List<QuestionResponse> questions;
}