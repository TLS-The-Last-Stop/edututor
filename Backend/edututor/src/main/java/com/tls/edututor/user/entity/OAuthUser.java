package com.tls.edututor.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "OAUTH_USER", uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"provider", "providerId"}
        )
})
@Getter
public class OAuthUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "PROVIDER", nullable = false)
  private String provider;

  @Column(name = "PROVIDER_ID", nullable = false)
  private String providerId;
  //private String username;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  public static OAuthUser createOAuthUser(String provider, String providerId, User user) {
    OAuthUser oAuthUser = new OAuthUser();
    oAuthUser.provider = provider;
    oAuthUser.providerId = providerId;
    oAuthUser.user = user;

    return oAuthUser;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
