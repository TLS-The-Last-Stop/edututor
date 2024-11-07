package com.tls.edututor.common.aop;

import com.tls.edututor.user.dto.response.AuthUser;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<Long> {

  @Override
  public Optional<Long> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      return Optional.empty();
    }

    Object principal = authentication.getPrincipal();

    if (principal instanceof AuthUser) {
      return Optional.of(((AuthUser) principal).getId());
    } else if (principal instanceof DefaultOAuth2User) {
      DefaultOAuth2User oAuth2User = (DefaultOAuth2User) principal;

      return Optional.of(oAuth2User.getAttribute("id"));
    }

    return Optional.empty();
  }
}
