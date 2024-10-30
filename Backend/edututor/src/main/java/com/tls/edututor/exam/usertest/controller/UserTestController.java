package com.tls.edututor.exam.usertest.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;
import com.tls.edututor.exam.usertest.service.UserTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/test")
@RestController
@RequiredArgsConstructor
public class UserTestController {

  private final UserTestService userTestService;

  @GetMapping("/{testPaperId}")
  public CommonApiResponse<StudentTestPaperResponse> getTestPaper(@PathVariable Long testPaperId) {
    StudentTestPaperResponse response = userTestService.getTestPaper(testPaperId);
    return CommonApiResponse.createSuccess("시험지 조회", response);
  }

  @PostMapping("/submit")
  public CommonApiResponse<Void> submitUserTest(@RequestBody UserTestRequest userTestRequest, Authentication authentication) {
    System.out.println(userTestRequest.toString());
    userTestService.submitAndGradeUserTest(userTestRequest, authentication);
    return CommonApiResponse.createNoContent("시험 제출");
  }
}
