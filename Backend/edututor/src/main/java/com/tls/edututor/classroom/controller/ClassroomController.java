package com.tls.edututor.classroom.controller;

import com.tls.edututor.classroom.service.ClassroomService;
import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.user.dto.response.UserSTResponse;
import lombok.RequiredArgsConstructor;
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

  /*@GetMapping("/classrooms/{classroomId}/students")
  public CommonApiResponse<?> getStudents(@PathVariable Long classroomId) {
    List<UserSTResponse> students = classroomService.getAllStudent(classroomId);
    return CommonApiResponse.createSuccess("학생 목록 조회", students);
  }*/

  @GetMapping("/{classroomId}/students")
  public CommonApiResponse<?> getStudentsWithClassroomId(@PathVariable("classroomId") Long classroomId) {
    List<UserSTResponse> students = classroomService.getAllStudent(classroomId, false);
    Map<Long, List<UserSTResponse>> map = new HashMap<>();
    map.put(classroomId, students);

    return CommonApiResponse.createSuccess("학생 목록 조회", map);
  }

  @GetMapping("/{classroomId}/students/{studentId}")
  public CommonApiResponse<?> getStudentByStudentId(@PathVariable("classroomId") Long classroomId, @PathVariable("studentId") Long studentId) {
    UserSTResponse student = classroomService.getStudent(classroomId, studentId);

    return CommonApiResponse.createSuccess("조회된 학생", student);
  }

}
