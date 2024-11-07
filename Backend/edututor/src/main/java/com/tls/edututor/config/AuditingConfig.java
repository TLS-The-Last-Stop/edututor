package com.tls.edututor.config;

import com.tls.edututor.common.aop.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

@Configuration
public class AuditingConfig {

  @Bean
  public AuditorAware<Long> auditorProvider() {
    return new AuditorAwareImpl();
  }
}
