package com.tls.edututor.classroom.service;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.user.dto.response.UserSUResponse;

import java.util.List;

public interface ClassroomService {
  Long save(ClassroomRequest request);

  List<UserSUResponse> getAllStudent(Long classroomId);

  UserSUResponse getStudent(Long classroomId, Long studentId);

}
