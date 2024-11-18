package com.tls.edututor.exam.question.dto.response;

import com.tls.edututor.exam.option.dto.response.OptionResponse;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.entity.QuestionType;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionResponse {
  private Long id;
  private String content;
  private String commentary;
  private QuestionType type;
  private String answerText;
  private Integer level;
  private List<OptionResponse> options;

  public static QuestionResponse fromEntity(Question question) {
    List<OptionResponse> optionResponses = question.getOptions().stream()
            .map(OptionResponse::fromEntity)
            .collect(Collectors.toList());
    return QuestionResponse.builder()
            .id(question.getId())
            .content(question.getContent())
            .commentary(question.getCommentary())
            .type(question.getType())
            .answerText(question.getAnswerText())
            .level(question.getLevel())
            .options(optionResponses)
            .build();
  }
}