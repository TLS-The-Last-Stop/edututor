package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserSTResponse {
  private Long id;
  private String studentFullName;
  private String studentLoginId;
  //private String studentProfileImage;
}
