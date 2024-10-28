package com.tls.edututor.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Refresh {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String loginId;

  @Column(name = "token", length = 300, unique = true)
  private String refreshToken;

  @Column(nullable = false)
  private String expiration;

  @Column(nullable = false)
  private boolean used;

  @Builder
  public Refresh(String loginId, String refreshToken, String expiration) {
    this.loginId = loginId;
    this.refreshToken = refreshToken;
    this.expiration = expiration;
    this.used = false;
  }

  public void markAsUsed() {
    this.used = true;
  }

  public void updateToken(Long id, String loginId, String newToken, Long newExpiration) {
    this.id = id;
    this.loginId = loginId;
    this.refreshToken = newToken;
    this.expiration = new Date(System.currentTimeMillis() + newExpiration).toString();
    this.used = false;
  }

}
