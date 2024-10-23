package com.tls.edututor.user.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.edututor.user.dto.CustomUser;
import com.tls.edututor.user.entity.Refresh;
import com.tls.edututor.user.repository.RefreshRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

  private final RefreshRepository refreshRepository;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final ObjectMapper objectMapper;

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
    try {
      Map map = objectMapper.readValue(request.getInputStream(), Map.class);

      if (map.get("loginId") == null || map.get("password") == null) {
        throw new AuthenticationServiceException("로그인 정보가 누락되었습니다.");
      }

      String loginId = map.get("loginId").toString();
      String password = map.get("password").toString();

      UsernamePasswordAuthenticationToken token =
              new UsernamePasswordAuthenticationToken(loginId, password, null);
      return authenticationManager.authenticate(token);

    } catch (IOException e) {
      throw new AuthenticationServiceException("로그인 요청 처리 중 오류가 발생했습니다.", e);
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
    CustomUser customUser = (CustomUser) authResult.getPrincipal();
    String loginId = customUser.getUsername();
    String id = String.valueOf(customUser.getId());

    Map<String, String> claims = new HashMap<>();
    claims.put("id", id);
    claims.put("loginId", loginId);

    String accessToken = jwtUtil.createToken("access", claims, 1000 * 60 * 60L); // 1시간 => 더 줄이기
    String refreshToken = jwtUtil.createToken("refresh", claims, 1000 * 60 * 60 * 24L); // 24시간 => 더 줄이기

    addRefreshEntity(loginId, refreshToken, 1000 * 60 * 60 * 24L);

    response.setStatus(HttpServletResponse.SC_OK);
    response.addCookie(createCookie("access", accessToken));
    response.addCookie(createCookie("refresh", refreshToken));
  }

  private void addRefreshEntity(String loginId, String refreshToken, long expiredMs) {
    Date date = new Date(System.currentTimeMillis() + expiredMs);

    Refresh build = Refresh.builder()
            .loginId(loginId)
            .refreshToken(refreshToken)
            .expiration(date.toString())
            .build();

    refreshRepository.save(build);
  }

  private Cookie createCookie(String key, String value) {
    Cookie cookie = new Cookie(key, value);
    if (key.startsWith("refresh")) cookie.setMaxAge(24 * 60 * 60); // 토큰을 만들때와 동일하게
    else if (key.startsWith("access")) cookie.setMaxAge(60 * 60);
    cookie.setHttpOnly(true);

    return cookie;
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType("application/json;charset=UTF-8");

    Map<String, Object> errorResponse = new HashMap<>();
    errorResponse.put("message", failed.getMessage());
    errorResponse.put("status", HttpServletResponse.SC_UNAUTHORIZED);

    objectMapper.writeValue(response.getWriter(), errorResponse);
  }
}
