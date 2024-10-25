package com.tls.edututor.user.dto.response;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUser implements UserDetails {

  private final AuthUser user;
  private final Collection<? extends GrantedAuthority> authorities;
  private String password;

  public CustomUser(AuthUser user, String password) {
    this.user = user;
    this.password = password;
    this.authorities = List.of(new SimpleGrantedAuthority(user.getRole()));
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  /**
   * 로그인 아이디 아니고, 입력받은 이름(ex. 이수완)
   *
   * @return 입력시 받은 이름
   */
  @Override
  public String getUsername() {
    return user.getFullName();
  }

  public Long getId() {
    return user.getId();
  }

  public String getEmail() {
    return user.getEmail();
  }

}
