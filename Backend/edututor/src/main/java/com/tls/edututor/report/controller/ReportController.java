package com.tls.edututor.report.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {
  private final ReportService reportService;

  @GetMapping
  public CommonApiResponse<List<TestPaperResponse2>> getTestPapers(@RequestParam Long classroomId) {
    return CommonApiResponse.createSuccess("report", reportService.getTestPapers(classroomId));
  }

  @GetMapping("/{testPaperId}")
  public CommonApiResponse<TestPaperDetailResponse> getTestPaperDetail(@PathVariable Long testPaperId) {
    return CommonApiResponse.createSuccess("report detail", reportService.getTestPaperDetail(testPaperId));
  }
}