package com.tls.edututor.course.unit.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnitRegisterRequest {
  private String content;
  private Long writer;
}
