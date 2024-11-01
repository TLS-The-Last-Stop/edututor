package com.tls.edututor.user.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRequest {
  private String loginId;
  private String password;
}
