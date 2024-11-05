package com.tls.edututor.user.repository;

import com.tls.edututor.user.entity.OAuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuthUserRepository extends JpaRepository<OAuthUser, Long> {

  Optional<OAuthUser> findByProviderAndProviderId(String registrationId, String providerId);
}
