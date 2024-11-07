package com.tls.edututor.user.dto.response;

import com.tls.edututor.classroom.dto.response.ClassroomResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class UserSUResponse {
  private Long id;
  private String username;
  private String loginId;
  private ClassroomResponse classroom;
  private Map<Long, Boolean> isShared;
  private String role;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private Boolean isDeleted;
  //private String studentProfileImage;
}
