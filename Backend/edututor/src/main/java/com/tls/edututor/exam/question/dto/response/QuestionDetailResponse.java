package com.tls.edututor.exam.question.dto.response;

import com.tls.edututor.exam.option.dto.response.OptionResponse;
import com.tls.edututor.exam.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDetailResponse {
  private Long id;
  private String content;
  private List<OptionResponse> options;

  public static QuestionDetailResponse fromEntity(Question question) {
    List<OptionResponse> optionResponses = question.getOptions().stream()
            .map(OptionResponse::fromEntity)
            .collect(Collectors.toList());

    return new QuestionDetailResponse(question.getId(), question.getContent(), optionResponses);
  }
}
