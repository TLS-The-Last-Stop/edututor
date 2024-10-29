package com.tls.edututor.exam.usertest.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserTestRequest {
  private Long userId;
  private Long testPaperId;
  private int result;
  private boolean examTaken;
}