package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.UserTERequest;

public interface UserService {

  Long saveUser(UserTERequest request);

}
