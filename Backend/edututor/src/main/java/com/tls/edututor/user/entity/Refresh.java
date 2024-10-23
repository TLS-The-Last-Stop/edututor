package com.tls.edututor.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

}
