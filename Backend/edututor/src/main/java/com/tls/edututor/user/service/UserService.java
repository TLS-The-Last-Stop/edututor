package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.request.UserTERequest;

public interface UserService {

  boolean checkJoinAvailable(String loginId);

  Long saveUser(UserTERequest request);

}
