package com.tls.edututor.course.course.service;

import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.entity.Course;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
/**
 * 강의(Course)와 관련된 비즈니스 로직을 정의하는 서비스 인터페이스입니다.
 */
public interface CourseService {

  /**
   * 강의, 섹션, 단원을 생성하고 이미지를 업로드합니다.
   *
   * @param request    강의 및 섹션 데이터를 포함한 요청 맵
   * @param imageFile  업로드할 이미지 파일
   * @return 생성된 강의 엔티티
   */
  Course createCourseWithSectionsAndUnits(Map<String, Object> request, MultipartFile imageFile);

  /**
   * 모든 강의 목록을 조회합니다.
   *
   * @return 강의 이름 목록
   */
  List<CourseNameListResponse> selectAllCourseList();

  /**
   * 특정 강의의 세부 정보를 조회합니다.
   *
   * @param courseId        조회할 강의의 ID
   * @param authentication  현재 사용자의 인증 정보
   * @return 강의 세부 정보 응답 객체
   */
  CourseResponse selectCourseDetails(Long courseId, Authentication authentication);

  /**
   * 강의를 업데이트합니다.
   *
   * @param courseId 업데이트할 강의의 ID
   * @param request  강의 업데이트 요청 데이터
   */
  void updateCourse(Long courseId, CourseRegisterRequest request);

  /**
   * 강의를 삭제합니다.
   *
   * @param courseId 삭제할 강의의 ID
   */
  void deleteCourse(Long courseId);

  /**
   * 현재 사용자가 속한 교실의 강의 목록을 조회합니다.
   *
   * @param authentication 현재 사용자의 인증 정보
   * @return 강의 이름 목록
   */
  List<CourseNameListResponse> getClassroomCourses(Authentication authentication);

  /**
   * 필터 조건에 맞는 강의 목록을 조회합니다.
   *
   * @param gradeLevel      학년
   * @param year            학년도
   * @param semester        학기
   * @param subject         과목
   * @param authentication  현재 사용자의 인증 정보
   * @return 필터링된 강의 이름 목록
   */
  List<CourseNameListResponse> getFilteredCourses(String gradeLevel, String year, String semester, String subject, Authentication authentication);

  /**
   * 특정 강의를 교실에 등록합니다.
   *
   * @param courseId        등록할 강의의 ID
   * @param authentication  현재 사용자의 인증 정보
   */
  void enrollCourseInClassroom(Long courseId, Authentication authentication);
}
