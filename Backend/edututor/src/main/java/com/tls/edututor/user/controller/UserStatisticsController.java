package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.response.UserStatisticsResponse;
import com.tls.edututor.user.service.UserStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class UserStatisticsController {

  private final UserStatisticsService statisticsService;

  @GetMapping("/users")
  public CommonApiResponse<UserStatisticsResponse> getUserStatistics() {
    UserStatisticsResponse statistics = statisticsService.getUserStatistics();
    return CommonApiResponse.createSuccess("통계 조회 성공", statistics);
  }

  @PostMapping("/users/refresh")
  @PreAuthorize("hasRole('AD')")
  public CommonApiResponse<?> refreshUserStatistics() {
    statisticsService.refreshStatistics();
    return CommonApiResponse.createNoContent("통계 캐시 갱신 성공");
  }
}
