package com.tls.edututor.exam.testpaper.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import com.tls.edututor.exam.testpaper.service.TestPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/test-paper")
public class TestPaperController {

  private final TestPaperService testPaperService;

  @GetMapping("/{id}")
  public CommonApiResponse<TestPaperResponse> getTestPaperById(@PathVariable Long id) {
    return CommonApiResponse.createCreated("시험지 조회 성공", testPaperService.getTestPaperById(id));
  }

  @PostMapping
  public CommonApiResponse<Void> createTestPaper(@RequestBody TestPaperRegisterRequest request) {
    testPaperService.createTestPaperWithQuestionsAndOptions(request);
    return CommonApiResponse.createNoContent("시험지 생성 성공");
  }
}
