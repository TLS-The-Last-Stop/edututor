package com.tls.edututor.exam.option.dto.response;

import com.tls.edututor.exam.option.entity.Option;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionResponse {
  private Long id;
  private String content;
  private Boolean isCorrect;

  public static OptionResponse fromEntity(Option option) {
    return OptionResponse.builder()
            .id(option.getId())
            .content(option.getContent())
            .isCorrect(option.getIsCorrect())
            .build();
  }
}