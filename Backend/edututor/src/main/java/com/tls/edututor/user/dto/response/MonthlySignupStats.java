package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySignupStats {
  private Integer year;
  private Integer month;
  private Long count;
}
