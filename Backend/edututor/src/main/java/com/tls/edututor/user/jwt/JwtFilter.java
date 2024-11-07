package com.tls.edututor.user.jwt;

import com.tls.edututor.user.dto.response.AuthUser;
import com.tls.edututor.user.dto.response.CustomUser;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final UserDetailsService userDetailsService;

  @Override
  @Transactional(readOnly = true)
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    Cookie[] cookies = request.getCookies();
    String accessToken = "";

    if (cookies == null) {
      filterChain.doFilter(request, response);
      return;
    }

    try {
      for (Cookie cookie : cookies) {
        if (cookie.getName().startsWith("access"))
          accessToken = cookie.getValue();
      }

      if (accessToken.isBlank()) {
        SecurityContextHolder.getContext().setAuthentication(null);
        filterChain.doFilter(request, response);
        return;
      }

      jwtUtil.isExpired(accessToken);
    } catch (ExpiredJwtException eje) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    // access 토큰인지 확인
    String type = jwtUtil.getType(accessToken);
    if (!type.startsWith("access")) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    String loginId = jwtUtil.getLoginId(accessToken);


    try { // 없는 쿠키로 요청을 보냈을때 반복되는 쿠키 검증 처리
      CustomUser user = (CustomUser) userDetailsService.loadUserByUsername(loginId);
      String role = user.getAuthorities().stream()
              .findFirst()
              .map(GrantedAuthority::getAuthority)
              .orElse("");

      AuthUser authUser = new AuthUser(user.getId(), user.getUsername(), user.getEmail(), user.getClassroom(), role);

      UsernamePasswordAuthenticationToken authentication =
              new UsernamePasswordAuthenticationToken(authUser, null, List.of(new SimpleGrantedAuthority("ROLE_" + role)));

      SecurityContextHolder.getContext().setAuthentication(authentication);

      filterChain.doFilter(request, response);
    } catch (BadCredentialsException bce) {
      removeCookiesAndSendUnauthorized(request, response);
    }
  }

  private void removeCookiesAndSendUnauthorized(HttpServletRequest request, HttpServletResponse response) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().startsWith("access") || cookie.getName().startsWith("refresh")) {
          Cookie newCookie = new Cookie(cookie.getName(), null);
          newCookie.setMaxAge(0);
          newCookie.setPath("/");
          response.addCookie(newCookie);
        }
      }
    }

    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
  }
}
