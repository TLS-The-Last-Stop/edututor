package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.request.FindUserRequest;
import com.tls.edututor.user.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailController {

  private final MailService mailService;

  @PostMapping("/loginid")
  public CommonApiResponse<?> getLoginId(@RequestBody FindUserRequest findUserRequest) {
    mailService.findLoginId(findUserRequest);

    return CommonApiResponse.createNoContent("아이디 전송");
  }

  @PostMapping("/password")
  public CommonApiResponse<?> getPassword(@RequestBody FindUserRequest findUserRequest) {
    mailService.findPassword(findUserRequest);

    return CommonApiResponse.createNoContent("비밀번호 전송");
  }
}
