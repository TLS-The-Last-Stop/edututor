package com.tls.edututor.exam.useransewer.dto.response;

import com.tls.edututor.exam.option.dto.response.OptionResponse;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class UserAnswerResponse {
  private Long questionId;
  private String questionContent;
  private String userAnswer;
  private boolean isCorrect;
  private Double score;
  private List<OptionResponse> options;

  public static UserAnswerResponse fromUserAnswer(UserAnswer userAnswer) {
    List<OptionResponse> optionResponses = userAnswer.getQuestion().getOptions().stream()
            .map(OptionResponse::fromEntity)
            .collect(Collectors.toList());

    return UserAnswerResponse.builder()
            .questionId(userAnswer.getQuestion().getId())
            .questionContent(userAnswer.getQuestion().getContent())
            .userAnswer(userAnswer.getAnswer())
            .isCorrect(userAnswer.getIsCorrect() != null && userAnswer.getIsCorrect())
            .score(userAnswer.getIsCorrect() != null && userAnswer.getIsCorrect() ? 10.0 : 0.0)
            .options(optionResponses)
            .build();
  }
}
