package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.UserTERequest;
import com.tls.edututor.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserServiceImpl userService;

  @PostMapping("/join")
  public CommonApiResponse<?> login(@RequestBody UserTERequest request) {
    userService.saveUser(request);
    return CommonApiResponse.createNoContent("회원가입이 완료되었습니다.");
  }


}
