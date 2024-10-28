package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.response.UpdateTokenResponse;
import com.tls.edututor.user.service.RefreshService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RefreshController {

  private final RefreshService refreshService;

  @PostMapping("/auth/refresh")
  public CommonApiResponse<?> createNewAccessToken(HttpServletRequest request, HttpServletResponse response) {
    try {
      UpdateTokenResponse tokens = refreshService.createNewAccessToken(request);

      Cookie newAccessToken = createCookie("access", tokens.getNewAccessToken());
      Cookie newRefreshToken = createCookie("refresh", tokens.getNewRefreshToken());

      response.addCookie(newAccessToken);
      response.addCookie(newRefreshToken);

      return CommonApiResponse.createNoContent("쿠키 재설정");
    } catch (JwtException e) {
      return CommonApiResponse.createError(e.getMessage());
    }

  }

  private Cookie createCookie(String key, String value) {
    Cookie cookie = new Cookie(key, value);
    if (key.startsWith("refresh")) cookie.setMaxAge(24 * 60 * 60); // 토큰을 만들때와 동일하게
    else if (key.startsWith("access")) cookie.setMaxAge(60 * 60);

    cookie.setPath("/");
    cookie.setHttpOnly(true);

    return cookie;
  }

}
