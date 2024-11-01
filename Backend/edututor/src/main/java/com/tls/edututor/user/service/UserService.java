package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import org.springframework.security.core.Authentication;

public interface UserService {

  boolean checkJoinAvailable(String loginId);

  Long saveTeacher(UserTERequest request);

  Long saveStudent(UserSURequest request, Authentication authentication);

}
