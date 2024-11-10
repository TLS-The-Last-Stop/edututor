package com.tls.edututor.report.dto.response;

import com.tls.edututor.exam.useransewer.dto.response.UserAnswerResponse;
import com.tls.edututor.exam.usertest.entity.UserTest;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class ShareTestResponse {
  private Long userTestId;
  private String testPaperName;
  private List<UserAnswerResponse> questions;
  private Double totalScore;

  public static ShareTestResponse fromUserTest(UserTest userTest) {
    List<UserAnswerResponse> questionResponses = userTest.getUserAnswers().stream()
            .map(UserAnswerResponse::fromUserAnswer)
            .collect(Collectors.toList());

    Double totalScore = questionResponses.stream()
            .filter(UserAnswerResponse::isCorrect)
            .mapToDouble(UserAnswerResponse::getScore)
            .sum();

    return ShareTestResponse.builder()
            .userTestId(userTest.getId())
            .testPaperName(userTest.getShareTest().getTestPaper().getTitle())
            .questions(questionResponses)
            .totalScore(totalScore)
            .build();
  }
}
