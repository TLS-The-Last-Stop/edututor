package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateTokenResponse {
  private String newAccessToken;
  private String newRefreshToken;
}
