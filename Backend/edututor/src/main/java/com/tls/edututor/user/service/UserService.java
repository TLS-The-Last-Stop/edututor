package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.request.UserTERequest;

public interface UserService {

  boolean checkJoinAvailable(String joinId);

  Long saveUser(UserTERequest request);

}
