package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherStudentCount implements Serializable {
  private Long teacherId;
  private String teacherName;
  private Long studentCount;
}
