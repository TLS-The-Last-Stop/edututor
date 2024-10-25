package com.tls.edututor.classroom.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClassroomRequest {
  private String classroomName;
  private int year;
  private String grade;
}
