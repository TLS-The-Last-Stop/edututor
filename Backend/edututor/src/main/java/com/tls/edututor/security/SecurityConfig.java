package com.tls.edututor.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.edututor.user.jwt.CustomLogoutFilter;
import com.tls.edututor.user.jwt.JwtFilter;
import com.tls.edututor.user.jwt.JwtUtil;
import com.tls.edututor.user.jwt.CustomLoginFilter;
import com.tls.edututor.user.service.RefreshService;
import com.tls.edututor.user.service.impl.CustomOAuth2UserServiceImpl;
import com.tls.edututor.user.service.impl.CustomOAuthSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
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
  private final RefreshService refreshService;
  private final UserDetailsService userDetailsService;
  private final CustomOAuth2UserServiceImpl customOAuth2UserService;
  private final CustomOAuthSuccessHandler customOAuthSuccessHandler;

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

    http.oauth2Login(oauth -> oauth
            //.loginPage("http://localhost:5173/login")
            .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                    .userService(customOAuth2UserService))
            .successHandler(customOAuthSuccessHandler));

    http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/classroom", "/users/students", "/course/enroll",
                    "/exam-share").hasRole("TE")
            .requestMatchers("/student/**", "/course/{courseId}", "/course0/**",
                    "/course/class-courses", "/report/**").hasAnyRole("SU")
            .requestMatchers(HttpMethod.GET, "/users/{loginId}").permitAll()
            .requestMatchers(HttpMethod.POST, "/users/teachers").permitAll()
            .requestMatchers(HttpMethod.PATCH, "/users/teachers").permitAll()
            .requestMatchers(HttpMethod.PUT, "/users/teachers").permitAll()
            .requestMatchers("/", "/login", "/join", "/auth/**", "/users/ids/**", "/cmmn/**", "/server-check", "/mail/**").permitAll()  // 모든 사용자 접근 가능
            .requestMatchers("/admin/**").hasRole("AD")  // 최상위 관리자 권한
            .anyRequest().authenticated());

    http.addFilterAt(new CustomLoginFilter(refreshService, authenticationManager(authenticationConfiguration), jwtUtil, objectMapper), UsernamePasswordAuthenticationFilter.class);

    http.addFilterBefore(new CustomLogoutFilter(refreshService, jwtUtil), LogoutFilter.class);

    http.addFilterBefore(new JwtFilter(jwtUtil, userDetailsService), CustomLoginFilter.class);

    http.sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cors = new CorsConfiguration();

    cors.addAllowedOrigin("http://localhost:5173");
    cors.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
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

  @Bean
  public RoleHierarchy roleHierarchy() {
    RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
    roleHierarchy.setHierarchy(
            "ROLE_AD > ROLE_TE\n" +
                    "ROLE_TE > ROLE_SU"
    );
    return roleHierarchy;
  }
}
