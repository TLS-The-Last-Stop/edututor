package com.tls.edututor.exam.testpaper.dto.response;

import com.tls.edututor.exam.question.dto.response.QuestionResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TestPaperResponse {

  private Long id;
  private String title;
  private List<QuestionResponse> questions;
}
