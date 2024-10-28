package com.tls.edututor.report.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * 리포트 상세 유저시험정보
 */
@Getter
@Builder
public class UserTestResponse2 {
  private String userName; //유저명
  private Long achievementRate; //성취율(정답률)
  private List<String> userAnswers; //유저 답안
  private List<String> correctAnswers; //답안
}