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

/**
 * {@link ReportController}는 리포트 관련 API를 제공하는 컨트롤러입니다.
 * 해당 컨트롤러는 시험지 목록 조회, 시험지 상세 조회, 공유된 시험지 목록 조회 및 상세 조회 등의 기능을 제공합니다.
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

  private final ReportService reportService;

  /**
   * 주어진 조건에 맞는 시험지 목록을 조회하는 API입니다.
   *
   * @param authentication 현재 인증된 사용자 정보
   * @param pageable 페이징 정보
   * @param courseId 필터링할 강좌 ID (선택 사항)
   * @return 조회된 시험지 목록을 포함하는 응답
   */
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

  /**
   * 주어진 시험지 ID에 대한 상세 정보를 조회하는 API입니다.
   *
   * @param testPaperId 상세 조회할 시험지 ID
   * @return 조회된 시험지 상세 정보를 포함하는 응답
   */
  @GetMapping("/{testPaperId}")
  public CommonApiResponse<TestPaperDetailResponse> getTestPaperDetail(@PathVariable Long testPaperId) {
    return CommonApiResponse.createSuccess("리포트 상세페이지 조회!", reportService.getTestPaperDetail(testPaperId));
  }

  /**
   * 현재 사용자가 공유한 시험지 목록을 조회하는 API입니다.
   *
   * @param authentication 현재 인증된 사용자 정보
   * @param pageable 페이징 정보
   * @return 조회된 공유된 시험지 목록을 포함하는 응답
   */
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

  /**
   * 주어진 사용자 시험 ID에 대한 공유된 시험지의 상세 정보를 조회하는 API입니다.
   *
   * @param userTestId 상세 조회할 사용자 시험 ID
   * @return 조회된 시험지 상세 정보를 포함하는 응답
   */
  @GetMapping("/shared-tests/{userTestId}")
  public CommonApiResponse<ShareTestResponse> getSharedTestDetail(@PathVariable Long userTestId) {
    ShareTestResponse response = reportService.getSharedTestDetail(userTestId);
    return CommonApiResponse.createSuccess("시험 상세 정보를 조회했습니다.", response);
  }
}
