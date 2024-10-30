package com.tls.edututor.report.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.service.ReportService;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {
  private final ReportService reportService;

  @GetMapping
  public CommonApiResponse<List<TestPaperResponse2>> getTestPapers(Authentication authentication) {
    return CommonApiResponse.createSuccess("report", reportService.getTestPapers(authentication));
  }

  @GetMapping("/{testPaperId}")
  public CommonApiResponse<TestPaperDetailResponse> getTestPaperDetail(@PathVariable Long testPaperId) {
    return CommonApiResponse.createSuccess("report detail", reportService.getTestPaperDetail(testPaperId));
  }
}