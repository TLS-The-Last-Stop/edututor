package com.tls.edututor.user.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindUserRequest {

  private String email;
  private String loginId;

}
