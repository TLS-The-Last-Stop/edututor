package com.tls.edututor.course.section.dto.request;

import com.tls.edututor.course.unit.dto.request.UnitRegisterRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SectionRegisterRequest {

  private String content;
  private Long writer;
  private List<UnitRegisterRequest> units;
}
