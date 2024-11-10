package com.tls.edututor.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDeletedStats {
  private String role;
  private Long totalCount;
  private Long deletedCount;
  private String lastDeletedAt;  // 삭제 일시 추가

  public double getDeleteRate() {
    return totalCount > 0 ? (double) deletedCount / totalCount * 100 : 0;
  }

}
