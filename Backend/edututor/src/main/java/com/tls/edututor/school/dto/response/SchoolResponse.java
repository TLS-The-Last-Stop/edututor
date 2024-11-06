package com.tls.edututor.school.dto.response;

import com.tls.edututor.school.entity.School;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SchoolResponse {
  private Long id;
  private String type;
  private String name;
  private String officeCode;
  private String address;

  public static SchoolResponse from(School school) {
    return new SchoolResponse(
            school.getId(),
            school.getType(),
            school.getName(),
            school.getOfficeCode(),
            school.getAddress()
    );
  }
}
