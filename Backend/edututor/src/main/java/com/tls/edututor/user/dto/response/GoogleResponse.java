package com.tls.edututor.user.dto.response;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class GoogleResponse implements OAuthResponse {

  private final Map<String, Object> attributes;

  public GoogleResponse(Map<String, Object> attributes) {
    log.info("google attribute: {}", attributes);
    this.attributes = attributes;
  }

  @Override
  public String getProviderId() {
    return attributes.get("sub").toString();
  }

  @Override
  public String getEmail() {
    return attributes.get("email").toString();
  }

  @Override
  public String getName() {
    return attributes.get("name").toString();
  }

  @Override
  public String getProfileImage() {
    return attributes.get("picture").toString();
  }
}
