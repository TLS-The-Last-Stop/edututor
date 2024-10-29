package com.tls.edututor.course.course.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseFilterResponse {

  private Long courseId;
  private String courseName;
  private String gradeLevel;
  private String year;
  private String semester;
  private String subject;


}
