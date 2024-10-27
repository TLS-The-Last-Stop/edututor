package com.tls.edututor.course.course.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/course")
public class CourseController {

	private final CourseService courseService;

  @GetMapping
  public CommonApiResponse<List<CourseNameListResponse>> selectAllCourses() {
    return CommonApiResponse.createSuccess("조회 성공", courseService.selectAllCourseList());
  }

  @PostMapping
  public CommonApiResponse<Void> createCourse(@RequestBody CourseRegisterRequest request) {
    courseService.createCourseWithSectionsAndUnits(request);
    return CommonApiResponse.createSuccessWithNoContent("과정 생성 성공");
  }

  @GetMapping("/{courseId}")
  public CommonApiResponse<CourseResponse> getCourseDetails(@PathVariable Long courseId) {
    return CommonApiResponse.createSuccess("조회성공", courseService.selectCourseDetails(courseId));
  }

  @GetMapping("/code/{codeId}")
  public CommonApiResponse<List<Map<String, String>>> getCourseDetails(@PathVariable String codeId) {
    List<Map<String, String>> courseDetails = courseService.getCourseDetails(codeId);
    return CommonApiResponse.createCreated("공통 코드 조회 성공", courseDetails);
  }

  @PutMapping("/{courseId}")
  public CommonApiResponse<Void> updateCourse(@PathVariable Long courseId, @RequestBody CourseRegisterRequest request) {
    courseService.updateCourse(courseId, request);
    return CommonApiResponse.createSuccessWithNoContent("과정 수정 성공");
  }

  @DeleteMapping("/{courseId}")
  public CommonApiResponse<Void> deleteCourse(@PathVariable Long courseId) {
    courseService.deleteCourse(courseId);
    return CommonApiResponse.createSuccessWithNoContent("과정 삭제 성공");
  }

  @PostMapping("aa")
  public CommonApiResponse<Void> enrollCourse(@RequestBody CourseRegisterRequest request) {
    return CommonApiResponse.createSuccessWithNoContent("과정 등록 성공");
  }
}
