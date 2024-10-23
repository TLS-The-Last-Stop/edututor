package com.tls.edututor.course.course.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/course")
public class CourseController {

  private final CourseService courseService;

  @GetMapping
  public List<CourseNameListResponse> selectAllCourses() {
    return courseService.selectAllCourseList();
  }

  @PostMapping
  public CommonApiResponse<Void> createCourse(@RequestBody CourseRegisterRequest request) {
    courseService.createCourseWithSectionsAndUnits(request);
    return CommonApiResponse.createSuccessWithNoContent("등록 성공");
  }
}
