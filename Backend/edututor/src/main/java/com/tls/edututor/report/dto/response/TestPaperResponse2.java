package com.tls.edututor.report.dto.response;

import com.tls.edututor.common.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

/**
 * 리포트 리스트
 */
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