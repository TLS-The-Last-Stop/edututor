package com.tls.edututor.report.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

/**
 * 리포트 상세
 */
@Getter
@Builder
public class TestPaperDetailResponse {
  private Long id;
  private String title; // 시험지 제목
  private String sectionName; // 단원명
  private String unitName; // 차시명
  List<UserTestResponse2> userTestResponse2List;
}