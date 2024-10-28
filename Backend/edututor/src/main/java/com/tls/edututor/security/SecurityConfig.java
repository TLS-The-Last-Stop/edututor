package com.tls.edututor.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.edututor.user.jwt.JwtFilter;
import com.tls.edututor.user.jwt.JwtUtil;
import com.tls.edututor.user.jwt.LoginFilter;
import com.tls.edututor.user.repository.RefreshRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

  private final AuthenticationConfiguration authenticationConfiguration;
  private final JwtUtil jwtUtil;
  private final ObjectMapper objectMapper;
  private final RefreshRepository refreshRepository;

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable());
    http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
    http.formLogin(formLogin -> formLogin.disable());
    http.httpBasic(basic -> basic.disable());

    http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/classroom", "/users/students").hasRole("TE")
            .anyRequest().permitAll());

    /*http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/login", "/join", "/refresh").permitAll()
            .requestMatchers("/admin").hasRole("ADMIN")
            .anyRequest().authenticated());*/

    http.addFilterAt(new LoginFilter(refreshRepository, authenticationManager(authenticationConfiguration), jwtUtil, objectMapper), UsernamePasswordAuthenticationFilter.class);

    http.addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);

    http.sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cors = new CorsConfiguration();

    cors.addAllowedOrigin("http://localhost:5173");
    cors.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "FETCH", "DELETE", "OPTIONS"));
    cors.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
    cors.setAllowCredentials(true);
    cors.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cors);

    return source;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

}
