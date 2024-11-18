package com.tls.edututor.course.course.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/course")
public class CourseController {

  private final CourseService courseService;

  /**
   * 모든 과정 목록을 조회합니다.
   *
   * @return 과정 이름 목록을 포함하는 성공 응답
   */
  @GetMapping
  public CommonApiResponse<List<CourseNameListResponse>> selectAllCourses() {
    return CommonApiResponse.createSuccess("조회 성공", courseService.selectAllCourseList());
  }

  /**
   * 새로운 과정을 생성합니다. 과정과 섹션, 유닛을 함께 생성합니다.
   *
   * @param request 과정 생성 요청, 과정과 섹션에 대한 데이터를 포함
   * @param imageFile 과정 이미지 파일
   * @return 과정 생성 성공을 알리는 응답 (내용 없음)
   */
  @PostMapping
  public CommonApiResponse<Void> createCourse(
          @RequestPart("request") Map<String, Object> request,
          @RequestPart("imageFile") MultipartFile imageFile) {
    courseService.createCourseWithSectionsAndUnits(request, imageFile);
    return CommonApiResponse.createSuccessWithNoContent("과정 생성 성공");
  }

  /**
   * 특정 과정의 상세 정보를 조회합니다.
   *
   * @param courseId 조회할 과정의 ID
   * @param authentication 인증된 사용자 정보
   * @return 과정 상세 정보를 포함하는 성공 응답
   */
  @GetMapping("/{courseId}")
  public CommonApiResponse<CourseResponse> getCourseDetails(@PathVariable Long courseId, Authentication authentication) {
    return CommonApiResponse.createSuccess("조회성공", courseService.selectCourseDetails(courseId, authentication));
  }

  /**
   * 기존의 과정을 수정합니다.
   *
   * @param courseId 수정할 과정의 ID
   * @param request 수정할 과정의 데이터를 포함하는 요청
   * @return 과정 수정 성공을 알리는 응답 (내용 없음)
   */
  @PutMapping("/{courseId}")
  public CommonApiResponse<Void> updateCourse(@PathVariable Long courseId, @RequestBody CourseRegisterRequest request) {
    courseService.updateCourse(courseId, request);
    return CommonApiResponse.createSuccessWithNoContent("과정 수정 성공");
  }

  /**
   * 특정 과정을 삭제합니다.
   *
   * @param courseId 삭제할 과정의 ID
   * @return 과정 삭제 성공을 알리는 응답 (내용 없음)
   */
  @DeleteMapping("/{courseId}")
  public CommonApiResponse<Void> deleteCourse(@PathVariable Long courseId) {
    courseService.deleteCourse(courseId);
    return CommonApiResponse.createSuccessWithNoContent("과정 삭제 성공");
  }

  /**
   * 특정 과정에 클래스를 등록합니다.
   *
   * @param courseId 등록할 과정의 ID
   * @param authentication 인증된 사용자 정보
   * @return 클래스룸-과정 등록 성공을 알리는 응답 (내용 없음)
   */
  @PostMapping("/enroll")
  public CommonApiResponse<Void> enrollCourseInClassroom(@RequestParam Long courseId, Authentication authentication) {
    courseService.enrollCourseInClassroom(courseId, authentication);
    return CommonApiResponse.createSuccessWithNoContent("클래스룸-과정 등록 성공");
  }

  /**
   * 사용자가 등록한 클래스룸의 과정 목록을 조회합니다.
   *
   * @param authentication 인증된 사용자 정보
   * @return 클래스룸의 과정 목록을 포함하는 성공 응답
   */
  @GetMapping("/class-courses")
  public CommonApiResponse<List<CourseNameListResponse>> getClassroomCourses(Authentication authentication) {
    List<CourseNameListResponse> courses = courseService.getClassroomCourses(authentication);
    return CommonApiResponse.createSuccess("조회 성공", courses);
  }

  /**
   * 다양한 필터를 적용하여 과정을 조회합니다.
   *
   * @param gradeLevel 학년
   * @param year 연도
   * @param semester 학기
   * @param subject 과목
   * @param authentication 인증된 사용자 정보
   * @return 필터링된 과정 목록을 포함하는 성공 응답
   */
  @GetMapping("/filtered")
  public CommonApiResponse<List<CourseNameListResponse>> getFilteredCourses(
          @RequestParam(required = false) String gradeLevel, @RequestParam(required = false) String year,
          @RequestParam(required = false) String semester, @RequestParam(required = false) String subject,
          Authentication authentication) {
    List<CourseNameListResponse> courses = courseService.getFilteredCourses(gradeLevel, year, semester, subject, authentication);
    return CommonApiResponse.createSuccess("조회 성공", courses);
  }
}
