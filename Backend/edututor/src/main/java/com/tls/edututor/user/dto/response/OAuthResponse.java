package com.tls.edututor.user.dto.response;

public interface OAuthResponse {

  // 제공자가 발급하는 아이디(번호)
  String getProviderId();

  // 이메일
  String getEmail();

  // 사용자 실명
  String getName();

  // 프로필 사진
  String getProfileImage();

}
