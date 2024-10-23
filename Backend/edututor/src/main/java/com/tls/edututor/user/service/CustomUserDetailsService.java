package com.tls.edututor.user.service;

import com.tls.edututor.code.CodeDetailRepository;
import com.tls.edututor.user.dto.CustomUser;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;
  private final CodeDetailRepository codeDetailRepository;

  @Override
  public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
    User user = userRepository.findByLoginId(loginId).orElseThrow();
    CustomUser customUser = new CustomUser(user, codeDetailRepository);

    return customUser;
  }
}
