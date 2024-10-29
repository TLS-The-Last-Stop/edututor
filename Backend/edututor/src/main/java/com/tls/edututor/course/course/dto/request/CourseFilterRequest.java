package com.tls.edututor.course.course.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseFilterRequest {
  private String gradeLevel;
  private String year;
  private String semester;
  private String subject;
}
