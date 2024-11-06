package com.tls.edututor.user.jwt;

import com.tls.edututor.user.entity.Refresh;
import com.tls.edututor.user.repository.RefreshRepository;
import com.tls.edututor.user.service.RefreshService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

  private final RefreshService refreshService;
  private final JwtUtil jwtUtil;

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
  }

  private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

    // path and method verify
    String requestURI = request.getRequestURI();
    if (!requestURI.matches("^\\/api/logout$")) {
      filterChain.doFilter(request, response);
      return;
    }

    String requestMethod = request.getMethod();
    if (!requestMethod.equals("POST")) {
      filterChain.doFilter(request, response);
      return;
    }

    // get refresh token => /logout, post 요청
    String refreshToken = "";
    Cookie[] cookies = request.getCookies();
    for (Cookie cookie : cookies) {
      if (cookie.getName().startsWith("refresh")) {
        refreshToken = cookie.getValue();
      }
    }

    // refresh null check
    if (refreshToken.isBlank()) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    // expired check
    try {
      jwtUtil.isExpired(refreshToken);
    } catch (ExpiredJwtException e) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    // check refresh
    String category = jwtUtil.getType(refreshToken);
    if (!category.startsWith("refresh")) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    // db저장 되어있는지 확인
    Refresh refresh = refreshService.getRefreshToken(refreshToken);
    if (refresh == null) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    refreshService.deleteRefreshToken(refreshToken);

    Cookie refreshCookie = new Cookie("refresh", null);
    refreshCookie.setMaxAge(0);
    refreshCookie.setPath("/");


    Cookie accessCookie = new Cookie("access", null);
    accessCookie.setMaxAge(0);
    accessCookie.setPath("/");

    response.addCookie(refreshCookie);
    response.addCookie(accessCookie);
    response.setStatus(HttpServletResponse.SC_OK);
  }

}
