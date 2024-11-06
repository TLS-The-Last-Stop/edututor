/*
package com.tls.edututor.user.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

// 이걸 아마 시큐리티 컨텍스트 홀더에 넣어야 하나?? 아니면 .. 그냥 기존거로 되는건가
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

  private final OAuthUserSecurityRequest request;

  @Override
  public Map<String, Object> getAttributes() {
    return null;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(request.getRole()));
    return authorities;
  }

  @Override
  public String getName() {
    return request.getUsername();
  }
}
*/
