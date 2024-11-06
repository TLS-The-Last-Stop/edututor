package com.tls.edututor.user.service.impl;

import com.tls.edututor.user.dto.response.GoogleResponse;
import com.tls.edututor.user.dto.response.NaverResponse;
import com.tls.edututor.user.dto.response.OAuthResponse;
import com.tls.edututor.user.entity.OAuthUser;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.OAuthUserRepository;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CustomOAuth2UserServiceImpl extends DefaultOAuth2UserService {

  private final UserRepository userRepository;
  private final OAuthUserRepository oAuthUserRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    String registrationId = userRequest.getClientRegistration().getRegistrationId();

    OAuthResponse oAuthResponse = null;
    if (registrationId.equals("naver")) oAuthResponse = new NaverResponse(oAuth2User.getAttributes());
    else if (registrationId.equals("google")) oAuthResponse = new GoogleResponse(oAuth2User.getAttributes());
    else throw new OAuth2AuthenticationException("지원하지 않는 OAuth 제공자입니다.");

    Optional<OAuthUser> existingOAuthUser = oAuthUserRepository.findByProviderAndProviderId(registrationId, oAuthResponse.getProviderId());

    User user = null;
    if (existingOAuthUser.isPresent()) {
      user = existingOAuthUser.get().getUser();

      if (user.getIsDeleted()) throw new OAuth2AuthenticationException("탈퇴한 사용자입니다.");
    } else {
      // 새로운 유저인 경우
      user = User.createOAuthUser(
              oAuthResponse.getEmail(),
              oAuthResponse.getName(),
              registrationId,
              oAuthResponse.getProviderId()
      );
      userRepository.save(user);

      OAuthUser oAuthUser = OAuthUser.createOAuthUser(registrationId, oAuthResponse.getProviderId(), user);
      oAuthUserRepository.save(oAuthUser);

      user.setOAuthUser(oAuthUser);
    }

    // OAuth2User 구성정보
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("id", user.getId());
    attributes.put("loginId", user.getLoginId());
    attributes.put("email", user.getEmail());
    attributes.put("username", user.getUsername());
    attributes.put("role", user.getRole());
    attributes.put("registrationStatus", user.getRegistrationStatus());


    return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority(user.getRole())),
            attributes,
            "email"
    );
  }
}
