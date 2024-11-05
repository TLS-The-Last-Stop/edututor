package com.tls.edututor.user.service.impl;

import com.tls.edututor.user.jwt.JwtUtil;
import com.tls.edututor.user.repository.OAuthUserRepository;
import com.tls.edututor.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional
public class CustomOAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private static final String BASE_URL = "http://localhost:5173";
  private final JwtUtil jwtUtil;
  private final OAuthUserRepository oAuthUserRepository;
  private final UserRepository userRepository;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

    DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
    long id = defaultOAuth2User.getAttribute("id");
    String loginId = defaultOAuth2User.getAttribute("loginId");
    String name = defaultOAuth2User.getAttribute("name");
    String email = defaultOAuth2User.getAttribute("email");

    Map<String, Object> claims = new HashMap<>();
    if (defaultOAuth2User.getAttribute("role").equals("ROLE_PENDING")) {
      // id값을 가진 쿠키 설정
      Cookie temp = createCookie("temp", String.valueOf(id));
      response.addCookie(temp);

      String redirectUrl = BASE_URL + "/status=r";
      response.getWriter().write(redirectUrl);
      response.sendRedirect(redirectUrl);
    } else {
      claims.put("id", id);
      claims.put("loginId", loginId);
      claims.put("username", name);
      claims.put("email", email);
      List<String> roles = defaultOAuth2User.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());
      claims.put("roles", String.join(",", roles));

      String accessToken = jwtUtil.createToken("access", claims, 1000 * 60 * 60L);
      String refreshToken = jwtUtil.createToken("refresh", claims, 1000 * 60 * 60 * 24L);

      response.addCookie(createCookie("access", accessToken));
      response.addCookie(createCookie("refresh", refreshToken));

      String redirectUrl = BASE_URL + "?status=c";
      response.sendRedirect(redirectUrl);
    }
  }

  private Cookie createCookie(String key, String value) {
    Cookie cookie = new Cookie(key, value);
    if (key.startsWith("refresh")) cookie.setMaxAge(24 * 60 * 60); // 토큰을 만들때와 동일하게
    else if (key.startsWith("access")) cookie.setMaxAge(60 * 60);
    else cookie.setMaxAge(60 * 5);
    cookie.setPath("/");
    cookie.setHttpOnly(true);

    return cookie;
  }

}
