package com.tls.edututor.exam.usertest.dto.request;

import com.tls.edututor.exam.useransewer.dto.request.UserAnswerRequest;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class UserTestRequest {
  private Long testPaperId;
  private List<UserAnswerRequest> answers;
}
