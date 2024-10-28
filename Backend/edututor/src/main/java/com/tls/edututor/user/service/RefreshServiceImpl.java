package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.response.UpdateTokenResponse;
import com.tls.edututor.user.entity.Refresh;
import com.tls.edututor.user.jwt.JwtUtil;
import com.tls.edututor.user.repository.RefreshRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RefreshServiceImpl implements RefreshService {

  private final JwtUtil jwtUtil;
  private final RefreshRepository refreshRepository;

  @Override
  @Transactional
  public UpdateTokenResponse createNewAccessToken(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    String refreshToken = "";

    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().startsWith("refresh")) {
          refreshToken = cookie.getValue();
          break;
        }
      }
    }

    if (refreshToken.isBlank()) throw new JwtException("refresh token is blank");

    Refresh refresh = getRefreshToken(refreshToken);

    String id = jwtUtil.getId(refreshToken);
    String loginId = jwtUtil.getLoginId(refreshToken);
    String username = jwtUtil.getUsername(refreshToken);
    String email = jwtUtil.getEmail(refreshToken);
    String role = jwtUtil.getRoles(refreshToken);

    Map<String, Object> claims = new HashMap<>();
    claims.put("id", id);
    claims.put("loginId", loginId);
    claims.put("username", username);
    claims.put("email", email);
    claims.put("roles", role);

    String newAccessToken = jwtUtil.createToken("access", claims, 1000 * 60 * 60L);
    String newRefreshToken = jwtUtil.createToken("refresh", claims, 1000 * 60 * 60 * 24L);

    refresh.updateToken(refresh.getId(), loginId, newRefreshToken, 1000 * 60 * 60 * 24L);

    refreshRepository.save(refresh);

    return new UpdateTokenResponse(newAccessToken, newRefreshToken);
  }

  public Refresh getRefreshToken(String refreshToken) {
    Refresh refresh = refreshRepository.findByRefreshTokenAndUsed(refreshToken, false).orElseThrow(() -> new JwtException("refresh token not found"));
    refresh.markAsUsed();

    return refresh;
  }

}