package com.tls.edututor.user.service;

import com.tls.edututor.user.dto.response.UpdateTokenResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface RefreshService {

  UpdateTokenResponse createNewAccessToken(HttpServletRequest request);
}
