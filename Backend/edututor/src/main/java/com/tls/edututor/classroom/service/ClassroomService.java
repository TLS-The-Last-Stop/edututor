package com.tls.edututor.classroom.service;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.user.dto.response.UserSTResponse;

import java.util.List;

public interface ClassroomService {
  Long save(ClassroomRequest request);

  List<UserSTResponse> getAllStudent(Long classroomId, boolean isDeleted);

  UserSTResponse getStudent(Long classroomId, Long studentId);

}
