package com.tls.edututor.course.section.dto.response;

import com.tls.edututor.course.unit.dto.response.UnitResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SectionResponse {
  private Long sectionId;
  private String content;
  private List<UnitResponse> units;
}