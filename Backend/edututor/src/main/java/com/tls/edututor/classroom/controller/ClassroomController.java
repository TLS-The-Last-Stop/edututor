package com.tls.edututor.classroom.controller;

import com.tls.edututor.classroom.service.ClassroomService;
import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.response.UserSUResponse;
import com.tls.edututor.user.dto.response.UserTEResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * 교실과 관련된 요청을 처리하는 REST 컨트롤러입니다.
 * 학생 및 교사 정보를 조회하는 엔드포인트를 제공합니다.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/classrooms")
public class ClassroomController {

  private final ClassroomService classroomService;

  /**
   * 특정 교실에 속한 모든 학생을 조회합니다.
   *
   * @param classroomId 조회할 교실의 식별자
   * @return 교실 ID와 학생 목록을 포함한 성공 응답 객체
   */
  @GetMapping("/{classroomId}/students")
  public CommonApiResponse<?> getStudentsWithClassroomId(@PathVariable("classroomId") Long classroomId) {
    List<UserSUResponse> students = classroomService.getAllStudent(classroomId);
    Map<Long, List<UserSUResponse>> map = new HashMap<>();
    map.put(classroomId, students);

    return CommonApiResponse.createSuccess("학생 목록 조회", map);
  }

  /**
   * 특정 교실의 특정 학생 정보를 조회합니다.
   *
   * @param classroomId 조회할 교실의 식별자
   * @param studentId 조회할 학생의 식별자
   * @return 학생 정보를 포함한 성공 응답 객체
   */
  @GetMapping("/{classroomId}/students/{studentId}")
  public CommonApiResponse<?> getStudentByStudentId(@PathVariable("classroomId") Long classroomId, @PathVariable("studentId") Long studentId) {
    UserSUResponse student = classroomService.getStudent(classroomId, studentId);
    return CommonApiResponse.createSuccess("조회된 학생", student);
  }

  /**
   * 특정 교실의 교사 정보를 조회합니다.
   *
   * @param classroomId 조회할 교실의 식별자
   * @param authentication 현재 사용자의 인증 정보
   * @return 교사 정보를 포함한 성공 응답 객체
   */
  @GetMapping("/{classroomId}")
  public CommonApiResponse<?> getTeacherByClassroomId(@PathVariable("classroomId") Long classroomId, Authentication authentication) {
    UserTEResponse teacher = classroomService.getTeacher(classroomId, authentication);
    return CommonApiResponse.createSuccess("조회된 선생", teacher);
  }
}
