package com.tls.edututor.user.dto.response;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class NaverResponse implements OAuthResponse {

  private final Map<String, Object> attributes;

  public NaverResponse(Map<String, Object> attributes) {
    log.info("naver attribute: {}", attributes);
    this.attributes = (Map<String, Object>) attributes.get("response");
  }

  @Override
  public String getProviderId() {
    return attributes.get("id").toString();
  }

  @Override
  public String getEmail() {
    return attributes.get("email").toString();
  }

  @Override
  public String getName() {
    return attributes.get("name").toString();
  }

  public String birthDay() {
    return attributes.get("birthday").toString();
  }

  public String birthYear() {
    return attributes.get("birthyear").toString();
  }

  @Override
  public String getProfileImage() {
    return attributes.get("profile_image").toString();
  }
}
