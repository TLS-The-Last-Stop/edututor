package com.tls.edututor.exam.sharetest.service;

import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import com.tls.edututor.report.dto.response.ShareTestResponse;
import org.springframework.security.core.Authentication;

public interface ShareTestServiceImpl {

  void saveShareTest(ShareTestRequest shareTestRequest, Authentication authentication);

  void deleteShareTest(ShareTestRequest shareTestRequest, Authentication authentication);

}
