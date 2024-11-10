package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class YearlySignupStats {
  private Integer year;
  private Long count;
}
