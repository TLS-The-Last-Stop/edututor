package com.tls.edututor.user.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

  private SecretKey secretKey;

  public JwtUtil(@Value("${spring.jwt.secret}") String secretKey) {
    this.secretKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
  }

  public String getId(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("id", String.class);
  }

  public String getType(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("type", String.class);
  }

  public String getLoginId(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("loginId", String.class);
  }

  public String getUsername(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
  }

  public String getEmail(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email", String.class);
  }

  public String getRoles(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("roles", String.class);
  }

  public boolean isExpired(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
  }

  public String createToken(String type, Map<String, Object> claims, Long expiredMs) {
    return Jwts.builder()
            .claim("type", type)
            .claims(claims)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiredMs))
            .signWith(secretKey)
            .compact();
  }
}
