package com.tls.edututor.classroom.service;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.user.dto.response.UserSUResponse;
import com.tls.edututor.user.dto.response.UserTEResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

/**
 * 교실과 관련된 비즈니스 로직을 정의하는 서비스 인터페이스입니다.
 */
public interface ClassroomService {

  /**
   * 새로운 교실 정보를 저장합니다.
   *
   * @param request 교실 생성 요청 데이터
   * @return 생성된 교실의 식별자
   */
  Long save(ClassroomRequest request);

  /**
   * 특정 교실에 속한 모든 학생을 조회합니다.
   *
   * @param classroomId 조회할 교실의 식별자
   * @return 학생 정보 목록
   */
  List<UserSUResponse> getAllStudent(Long classroomId);

  /**
   * 특정 교실의 특정 학생 정보를 조회합니다.
   *
   * @param classroomId 조회할 교실의 식별자
   * @param studentId 조회할 학생의 식별자
   * @return 학생 정보
   */
  UserSUResponse getStudent(Long classroomId, Long studentId);

  /**
   * 특정 교실의 교사 정보를 조회합니다.
   *
   * @param classroomId 조회할 교실의 식별자
   * @param authentication 현재 사용자의 인증 정보
   * @return 교사 정보
   */
  UserTEResponse getTeacher(Long classroomId, Authentication authentication);
}
