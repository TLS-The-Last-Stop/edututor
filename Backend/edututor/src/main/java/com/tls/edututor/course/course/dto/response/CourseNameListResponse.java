package com.tls.edututor.course.course.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseNameListResponse {

  Long courseId;
  String courseName;

  public CourseNameListResponse(Long courseId, String courseName) {
    this.courseId = courseId;
    this.courseName = courseName;
  }
}
