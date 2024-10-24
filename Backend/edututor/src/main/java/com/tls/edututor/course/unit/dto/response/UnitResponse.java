package com.tls.edututor.course.unit.dto.response;

import com.tls.edututor.course.material.dto.response.MaterialResponse;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UnitResponse {
  private Long unitId;
  private String content;
  private List<MaterialResponse> materials;
  private TestPaperResponse testPaper;
}