package com.tls.edututor.user.service;

import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.user.dto.response.AuthUser;
import com.tls.edututor.user.dto.response.CustomUser;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
    User user = userRepository.findByLoginId(loginId).orElseThrow(() -> new BadCredentialsException("AUTH001"));

    AuthUser authUser = new AuthUser(user.getId(), user.getFullName(), user.getEmail(), user.getClassroom(), user.getRole());

    return new CustomUser(authUser, user.getLoginId(), user.getPassword());
  }
}
