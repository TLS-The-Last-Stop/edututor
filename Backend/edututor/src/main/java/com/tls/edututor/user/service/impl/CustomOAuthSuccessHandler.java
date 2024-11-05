package com.tls.edututor.user.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.edututor.user.entity.Refresh;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.jwt.JwtUtil;
import com.tls.edututor.user.repository.UserRepository;
import com.tls.edututor.user.service.RefreshService;
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
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional
public class CustomOAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private static final String BASE_URL = "http://localhost:5173";
  private final JwtUtil jwtUtil;
  private final UserRepository userRepository;
  private final ObjectMapper objectMapper;
  private final RefreshService refreshService;

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

      String redirectUrl = BASE_URL + "/additional-info";
      response.getWriter().write(redirectUrl);
      response.sendRedirect(redirectUrl);
    } else {
      User user = userRepository.findByLoginIdAndIsDeleted(loginId, false).orElseThrow();
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

      addRefreshEntity(loginId, refreshToken, 1000 * 60 * 60 * 24L);

      response.addCookie(createCookie("access", accessToken));
      response.addCookie(createCookie("refresh", refreshToken));

      Cookie removeTempCookie = new Cookie("temp", null);
      removeTempCookie.setPath("/");
      removeTempCookie.setMaxAge(0);
      response.addCookie(removeTempCookie);

      Map<String, Object> userData = new HashMap<>();
      userData.put("classroom", user.getClassroom());
      userData.put("role", roles.get(0));
      userData.put("username", user.getUsername());

      response.setContentType("application/json; charset=utf-8");
      String encodedData = Base64.getEncoder().encodeToString(
              objectMapper.writeValueAsString(userData).getBytes(StandardCharsets.UTF_8)
      );

      response.sendRedirect(BASE_URL + "/oauth/success?data=" + encodedData);
    }
  }

  private void addRefreshEntity(String loginId, String refreshToken, long expiredMs) {
    Date date = new Date(System.currentTimeMillis() + expiredMs);

    Refresh refresh = Refresh.builder()
            .loginId(loginId)
            .refreshToken(refreshToken)
            .expiration(date.toString())
            .build();

    refreshService.saveRefreshToken(refresh);
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
