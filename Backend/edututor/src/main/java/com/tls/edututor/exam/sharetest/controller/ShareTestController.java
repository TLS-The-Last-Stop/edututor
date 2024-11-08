package com.tls.edututor.exam.sharetest.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import com.tls.edututor.exam.sharetest.service.impl.ShareTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ShareTestController {

  private final ShareTestService shareTestService;

  @PostMapping("/tests/papers/{testPaper}")
  public CommonApiResponse<?> createShareTest(@RequestBody ShareTestRequest shareTestRequest, Authentication authentication) {
    shareTestService.saveShareTest(shareTestRequest, authentication);
    return CommonApiResponse.createNoContent("공유가 성공되었습니다.");
  }

  @DeleteMapping("/tests/papers/{testPaper}")
  public CommonApiResponse<?> deleteShareTest(@RequestBody ShareTestRequest shareTestRequest, Authentication authentication) {
    shareTestService.deleteShareTest(shareTestRequest, authentication);
    return CommonApiResponse.createNoContent("공유가 취소되었습니다.");
  }
}
