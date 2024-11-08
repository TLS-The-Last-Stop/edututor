package com.tls.edututor.exam.sharetest.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ShareTestRequest {
  private Long unitId;
  private List<Long> studentId;
}
