package com.tls.edututor.exam.testpaper.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import com.tls.edututor.exam.testpaper.service.TestPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 시험지 관리 REST API 컨트롤러입니다.
 *
 * 이 클래스는 시험지의 조회, 생성, 수정 및 삭제 기능을 제공합니다.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/test-paper")
public class TestPaperController {

  private final TestPaperService testPaperService;

  /**
   * 시험지 ID를 기준으로 시험지 정보를 조회합니다.
   *
   * @param testPaperId 조회할 시험지의 ID
   * @return 시험지 정보가 포함된 응답
   */
  @GetMapping("/{testPaperId}")
  public CommonApiResponse<TestPaperResponse> getTestPaperById(@PathVariable("testPaperId") Long testPaperId) {
    return CommonApiResponse.createCreated("시험지 조회 성공", testPaperService.getTestPaperById(testPaperId));
  }

  /**
   * 새로운 시험지를 생성합니다.
   * 시험지와 관련된 문제와 선택지를 함께 생성합니다.
   *
   * @param request 시험지 등록 요청 객체
   * @return 시험지 생성 성공 응답
   */
  @PostMapping
  public CommonApiResponse<Void> createTestPaper(@RequestBody TestPaperRegisterRequest request) {
    testPaperService.createTestPaperWithQuestionsAndOptions(request);
    return CommonApiResponse.createNoContent("시험지 생성 성공");
  }

  /**
   * 기존 시험지를 수정합니다.
   *
   * @param testPaperId 수정할 시험지의 ID
   * @param request 수정할 시험지 정보
   * @return 시험지 수정 성공 응답
   */
  @PutMapping("/{testPaperId}")
  public CommonApiResponse<Void> updateTestPaper(
          @PathVariable("testPaperId") Long testPaperId,
          @RequestBody TestPaperRegisterRequest request) {
    testPaperService.updateTestPaper(testPaperId, request);
    return CommonApiResponse.createNoContent("시험지 수정 성공");
  }

  /**
   * 시험지를 삭제합니다.
   *
   * @param testPaperId 삭제할 시험지의 ID
   * @return 시험지 삭제 성공 응답
   */
  @DeleteMapping("/{testPaperId}")
  public CommonApiResponse<Void> deleteTestPaper(@PathVariable("testPaperId") Long testPaperId) {
    testPaperService.deleteTestPaper(testPaperId);
    return CommonApiResponse.createNoContent("시험지 삭제 성공");
  }
}
