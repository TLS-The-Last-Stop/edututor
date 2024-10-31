package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.response.UpdateTokenResponse;
import com.tls.edututor.user.entity.Refresh;
import jakarta.servlet.http.HttpServletRequest;

public interface RefreshService {

  Refresh getRefreshToken(String refreshToken);

  void saveRefreshToken(Refresh refresh);

  UpdateTokenResponse createNewAccessToken(HttpServletRequest request);

  void deleteRefreshToken(String refreshToken);
}
