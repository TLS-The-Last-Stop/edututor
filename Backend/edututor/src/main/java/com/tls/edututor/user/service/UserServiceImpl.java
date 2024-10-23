package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.UserTERequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  @Transactional
  public Long saveUser(UserTERequest request) {
    request.setPassword(passwordEncoder.encode(request.getPassword()));

    User user = User.withDto()
            .dto(request)
            .build();

    return userRepository.save(user).getId();
  }
}
