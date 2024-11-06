package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class UserSUResponse {
  private Long id;
  private String username;
  private String loginId;
  private Long classroomId;
  private Map<Long, Boolean> isShared;
  //private String studentProfileImage;
}
