package com.tls.edututor.course.course.dto.response;

import com.tls.edututor.course.section.dto.response.SectionResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CourseResponse {
  private Long courseId;
  private String courseName;
  private List<SectionResponse> sections;
}