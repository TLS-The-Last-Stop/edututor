package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.response.UserStatisticsResponse;

public interface UserStatisticsService {
  UserStatisticsResponse getUserStatistics();

  void refreshStatistics();
}
