package com.tls.edututor.report.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class TestPaperResponse2 {
  private Long id;
  private String title;
  private String courseName;
  private String unitName;
  private LocalDate createdAt;
  private Integer participationCount;
  private Integer totalCount;
  private Double achievementRate;
}