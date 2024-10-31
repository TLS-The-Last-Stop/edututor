package com.tls.edututor.exam.sharetest.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import com.tls.edututor.exam.sharetest.service.impl.ShareTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ShareTestController {

  private final ShareTestService shareTestService;

  @PostMapping("/tests/papers/{testPaper}")
  public CommonApiResponse<?> createShareTest(@RequestBody ShareTestRequest shareTestRequest, Authentication authentication) {
    shareTestService.saveShareTest(shareTestRequest, authentication);
    return null;
  }

}
