package com.tls.edututor.user.jwt;

import com.tls.edututor.user.dto.AuthUser;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  @Override
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

      jwtUtil.isExpired(accessToken);
    } catch (ExpiredJwtException eje) {
      PrintWriter out = response.getWriter();
      out.print("access token expired");
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

      return;
    }

    // access 토큰인지 확인
    String type = jwtUtil.getType(accessToken);
    if (!type.startsWith("access")) {
      PrintWriter out = response.getWriter();
      out.print("invaild access token");
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

      return;
    }

    // 토큰에서 가져오기
    Long userId = jwtUtil.getUserId(accessToken);
    String username = jwtUtil.getUsername(accessToken);
    String email = jwtUtil.getEmail(accessToken);
    String roles = jwtUtil.getRoles(accessToken);

    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roles);

    AuthUser authUser = new AuthUser(userId, username, email, authority.getAuthority());

    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(authUser, null, List.of(authority));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    filterChain.doFilter(request, response);
  }
}
