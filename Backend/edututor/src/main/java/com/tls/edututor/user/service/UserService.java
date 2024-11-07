package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.dto.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface UserService {

  boolean checkJoinAvailable(String loginId);

  Long saveTeacher(UserTERequest request);

  Long saveStudent(UserSURequest request, Authentication authentication);

  Long updateStudent(UserSURequest request, Long id);

  Long deleteStudent(Long id);

  Long updateInfo(UserTERequest request, HttpServletRequest req);

  UserResponse findAllUser(Authentication authentication, int page);
}
