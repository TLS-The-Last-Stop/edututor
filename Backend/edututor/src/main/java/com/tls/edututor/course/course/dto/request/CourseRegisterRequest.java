package com.tls.edututor.course.course.dto.request;

import com.tls.edututor.course.section.dto.request.SectionRegisterRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CourseRegisterRequest {
  private Long classroomId;
  private String courseName;
  private String groupCode;
  private List<SectionRegisterRequest> sections;
}