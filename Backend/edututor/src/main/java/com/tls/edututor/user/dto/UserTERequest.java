package com.tls.edututor.user.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class UserTERequest {
  private String fullName;
  private String loginId;
  private String password;
  private String email;
  private String phoneNum;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate birthDay;
}
