package com.tls.edututor.user.dto.request;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.school.entity.School;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserSURequest {
  private Long teacherId;
  private String fullName;
  private String loginId;
  private String password;
  private School school;
  private Classroom classroom;
  private String type;
}
