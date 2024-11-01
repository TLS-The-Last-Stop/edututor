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
  private String userName;
  private Long achievementRate;
  private List<String> userAnswers;
  //  private List<String> correctAnswers;
  private long questionCount;
  private List<Boolean> isCorrect;
}