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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final UserDetailsService userDetailsService;

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    String path = request.getRequestURI();
    return path.equals("/api/auth/refresh") ||
            path.equals("/api/users/teachers") ||
            path.equals("/api/login") ||
            path.equals("/api/logout");
  }

  @Override
  @Transactional(readOnly = true)
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    Cookie[] cookies = request.getCookies();
    String accessToken = "";

    if (cookies == null) {
      filterChain.doFilter(request, response);
      return;
    }

    // Writer를 한 번만 생성
    //PrintWriter out = response.getWriter();

    try {
      for (Cookie cookie : cookies) {
        if (cookie.getName().startsWith("access"))
          accessToken = cookie.getValue();
      }

      if (accessToken.isBlank()) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        //out.write("no access token");
        filterChain.doFilter(request, response);
        return;
      }

      jwtUtil.isExpired(accessToken);
    } catch (ExpiredJwtException eje) {
      //out.write("access token expired");
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    // access 토큰인지 확인
    String type = jwtUtil.getType(accessToken);
    if (!type.startsWith("access")) {
      //out.write("invaild access token");
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    CustomUser user = (CustomUser) userDetailsService.loadUserByUsername(jwtUtil.getUsername(accessToken));
    String role = user.getAuthorities().stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse("");

    AuthUser authUser = new AuthUser(user.getId(), user.getFullName(), user.getEmail(), user.getClassroom(), role);

    UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(authUser, null, List.of(new SimpleGrantedAuthority("ROLE_" + role)));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    filterChain.doFilter(request, response);
  }
}
