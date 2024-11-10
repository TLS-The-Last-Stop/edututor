package com.tls.edututor.report.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.report.dto.response.ShareTestResponse;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {
  private final ReportService reportService;

  @GetMapping
  public CommonApiResponse<Page<TestPaperResponse2>> getTestPapers(Authentication authentication,
                                                                   @PageableDefault Pageable pageable,
                                                                   @RequestParam(required = false) Long courseId) {
    try {
      Page<TestPaperResponse2> result = reportService.getTestPapers(authentication, pageable, courseId);
      return CommonApiResponse.createSuccess("리포트 리스트 조회!", result);
    } catch (Exception e) {
      return CommonApiResponse.createError("리포트 리스트 조회 실패: " + e.getMessage());
    }
  }

  @GetMapping("/{testPaperId}")
  public CommonApiResponse<TestPaperDetailResponse> getTestPaperDetail(@PathVariable Long testPaperId) {
    return CommonApiResponse.createSuccess("리포트 상세페이지 조회!", reportService.getTestPaperDetail(testPaperId));
  }

  @GetMapping("/shared-tests")
  public CommonApiResponse<Page<ShareTestResponse>> getSharedTests(
          Authentication authentication,
          @PageableDefault Pageable pageable) {
    try {
      Page<ShareTestResponse> result = reportService.getSharedTests(authentication, pageable);
      return CommonApiResponse.createSuccess("공유받은 시험 리스트 조회 성공!", result);
    } catch (Exception e) {
      return CommonApiResponse.createError("공유받은 시험 리스트 조회 실패: " + e.getMessage());
    }
  }

  @GetMapping("/shared-tests/{userTestId}")
  public CommonApiResponse<ShareTestResponse> getSharedTestDetail(@PathVariable Long userTestId) {
    ShareTestResponse response = reportService.getSharedTestDetail(userTestId);
    return CommonApiResponse.createSuccess("시험 상세 정보를 조회했습니다.", response);
  }
}