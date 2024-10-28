package com.tls.edututor.classroom.controller;

import com.tls.edututor.classroom.service.ClassroomService;
import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.response.UserSTResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ClassroomController {

  private final ClassroomService classroomService;

  @GetMapping("/classrooms/{classroomId}/students")
  public CommonApiResponse<?> getStudents(@PathVariable Long classroomId) {
    List<UserSTResponse> students = classroomService.getAllStudent(classroomId);
    return CommonApiResponse.createSuccess("학생 목록 조회", students);
  }


}
