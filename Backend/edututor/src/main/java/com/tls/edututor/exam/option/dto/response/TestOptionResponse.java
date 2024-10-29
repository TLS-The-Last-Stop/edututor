package com.tls.edututor.exam.option.dto.response;


import com.tls.edututor.exam.option.entity.Option;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestOptionResponse {
  private Long optionId;
  private String content;

  public TestOptionResponse(Option option) {
    this.optionId = option.getId();
    this.content = option.getContent();
  }
}