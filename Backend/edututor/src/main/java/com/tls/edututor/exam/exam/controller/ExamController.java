package com.tls.edututor.exam.exam.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.exam.service.ExamService;
import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.useransewer.dto.request.UserAnswerRequest;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ExamController {

  private final ExamService examService;

  @GetMapping("/questions/{testPaperId}")
  public CommonApiResponse<StudentTestPaperResponse> getTestPaper(@PathVariable Long testPaperId) {
    TestPaper testPaper = examService.getTestPaperById(testPaperId);
    StudentTestPaperResponse response = examService.convertToDTO(testPaper);
    return CommonApiResponse.createSuccess("시험지 조회", response);
  }

  @PostMapping("/submit")
  public ResponseEntity<String> submitAnswers(@RequestBody List<UserAnswerRequest> userAnswers) {
    examService.submitUserAnswers(userAnswers);
    return ResponseEntity.ok("답안이 제출되었습니다!");
  }

  @PostMapping("/usertest")
  public ResponseEntity<String> submitUserTest(@RequestBody UserTestRequest userTestRequest) {
    examService.saveUserTestResult(userTestRequest);
    return ResponseEntity.ok("사용자 테스트 결과가 저장되었습니다!");
  }
}
