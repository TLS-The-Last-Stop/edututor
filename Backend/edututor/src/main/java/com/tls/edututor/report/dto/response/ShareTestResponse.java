package com.tls.edututor.report.dto.response;

import com.tls.edututor.exam.sharetest.entity.ShareTest;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ShareTestResponse {
  private Long id;
  private String testPaperName;
  private String unitName;
  private LocalDateTime deadline;

  public static ShareTestResponse fromEntity(ShareTest shareTest) {
    return ShareTestResponse.builder()
            .id(shareTest.getId())
            .testPaperName(shareTest.getTestPaper().getTitle())
            .unitName(shareTest.getTestPaper().getUnit().getContent())
            .deadline(shareTest.getDeadline())
            .build();
  }
}
