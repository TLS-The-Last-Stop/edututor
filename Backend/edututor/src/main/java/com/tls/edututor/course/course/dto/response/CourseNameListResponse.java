package com.tls.edututor.course.course.dto.response;

public class CourseNameListResponse {

  Long CourseId;
  String CourseName;

  public CourseNameListResponse(Long courseId, String courseName) {
    CourseId = courseId;
    CourseName = courseName;
  }
}
