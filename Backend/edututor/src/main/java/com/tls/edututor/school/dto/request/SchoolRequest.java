package com.tls.edututor.school.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SchoolRequest {
  private String type;
  private String name;
  private String officeCode;
  private String address;
}
