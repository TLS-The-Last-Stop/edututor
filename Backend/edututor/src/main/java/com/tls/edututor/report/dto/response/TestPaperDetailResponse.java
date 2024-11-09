package com.tls.edututor.report.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TestPaperDetailResponse {
  private Long id;
  private String title;
  private String sectionName;
  private String unitName;
  List<UserTestResponse2> userTestResponse2List;
}