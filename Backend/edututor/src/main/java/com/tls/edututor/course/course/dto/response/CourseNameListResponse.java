package com.tls.edututor.course.course.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CourseNameListResponse {

  Long courseId;
  String courseName;
  String subject;

}
