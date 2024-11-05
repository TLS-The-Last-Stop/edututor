package com.tls.edututor.user.dto.response;

import com.tls.edututor.classroom.entity.Classroom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class AuthUser {
  private Long id;
  private String username;
  private String email;
  private Classroom classroom;
  private String role;
}
