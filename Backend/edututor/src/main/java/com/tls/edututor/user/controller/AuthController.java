package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.response.AuthUser;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @GetMapping("/auth/verify")
  public CommonApiResponse<?> verify(Authentication authentication) {
    if (authentication == null) return CommonApiResponse.createNotFound("로그인이 진행해주세요.");

    if (!authentication.isAuthenticated()) return CommonApiResponse.createUnauthorized("권한이 없습니다.");

    AuthUser authUser = (AuthUser) authentication.getPrincipal();

    return CommonApiResponse.createSuccess("사용 가능", authUser.getRole());
  }
}
