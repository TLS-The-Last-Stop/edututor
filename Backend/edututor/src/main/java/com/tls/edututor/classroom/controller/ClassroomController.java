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

@RestController
@RequiredArgsConstructor
@RequestMapping("/classrooms")
public class ClassroomController {

  private final ClassroomService classroomService;

  @GetMapping("/{classroomId}/students")
  public CommonApiResponse<?> getStudentsWithClassroomId(@PathVariable("classroomId") Long classroomId) {
    List<UserSUResponse> students = classroomService.getAllStudent(classroomId);
    Map<Long, List<UserSUResponse>> map = new HashMap<>();
    map.put(classroomId, students);

    return CommonApiResponse.createSuccess("학생 목록 조회", map);
  }

  @GetMapping("/{classroomId}/students/{studentId}")
  public CommonApiResponse<?> getStudentByStudentId(@PathVariable("classroomId") Long classroomId, @PathVariable("studentId") Long studentId) {
    UserSUResponse student = classroomService.getStudent(classroomId, studentId);

    return CommonApiResponse.createSuccess("조회된 학생", student);
  }

  @GetMapping("/{classroomId}")
  public CommonApiResponse<?> getTeacher(@PathVariable("classroomId") Long classroomId, Authentication authentication) {
    UserTEResponse teacher = classroomService.getTeacher(classroomId, authentication);

    return CommonApiResponse.createSuccess("조회된 선생", teacher);
  }

}
