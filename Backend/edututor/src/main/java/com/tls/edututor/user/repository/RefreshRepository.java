package com.tls.edututor.user.repository;

import com.tls.edututor.user.entity.Refresh;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {
  Optional<Refresh> findByRefreshTokenAndUsed(String refreshToken, boolean used);
}
