package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserSTResponse {
  private Long id;
  private String username;
  private String loginId;
  private Map<Long, Boolean> isShared;
  //private String studentProfileImage;
}
