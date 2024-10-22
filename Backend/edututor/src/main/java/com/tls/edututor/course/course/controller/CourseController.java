package com.tls.edututor.course.course.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/course")
public class CourseController {

  private final CourseService courseService;

  @PostMapping
  public CommonApiResponse<Void> createCourse(@RequestBody CourseRegisterRequest request) {
    courseService.createCourseWithSectionsAndUnits(request);
    return CommonApiResponse.createSuccessWithNoContent("등록 성공");
  }
}
