package com.tls.edututor.exam.sharetest.service;

import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import org.springframework.security.core.Authentication;

public interface ShareTestServiceImpl {

  Long saveShareTest(ShareTestRequest shareTestRequest, Authentication authentication);

}