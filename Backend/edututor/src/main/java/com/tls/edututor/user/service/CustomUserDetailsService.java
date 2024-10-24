package com.tls.edututor.user.service;

import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.user.dto.AuthUser;
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
    User user = userRepository.findByLoginId(loginId).orElseThrow(() -> new UsernameNotFoundException("User not found with loginId: " + loginId));

    String role = determineUserRole(user);

    AuthUser authUser = new AuthUser(user.getId(), user.getFullName(), user.getEmail(), role);

    return new CustomUser(authUser, user.getPassword());
  }

  private String determineUserRole(User user) {
    if (user.getPhoneNum() != null && user.getBirthDay() != null) {
      return codeDetailRepository.findRoleById("1005", "TE")
              .orElseThrow(() -> new RuntimeException("Role TE not found"))
              .getId();
    } else {
      return codeDetailRepository.findRoleById("1005", "SU")
              .orElseThrow(() -> new RuntimeException("Role SU not found"))
              .getId();
    }
  }
}
