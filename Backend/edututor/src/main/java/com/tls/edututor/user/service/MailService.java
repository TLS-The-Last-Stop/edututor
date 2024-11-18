package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.request.FindUserRequest;

public interface MailService {
  void findLoginId(FindUserRequest findUserRequest);

  void findPassword(FindUserRequest request);
}
