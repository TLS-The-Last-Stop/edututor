package com.tls.edututor.course.courseclassroom.dto.request;

import lombok.Data;

@Data
public class ClassroomCourseRegisterRequest {
  private Long classroomId;
  private Long courseId;
}
