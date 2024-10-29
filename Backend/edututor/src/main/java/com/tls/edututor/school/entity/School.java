package com.tls.edututor.school.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.school.dto.request.SchoolRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class School extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "TYPE", nullable = false)
  private String type;

  @Column(name = "NAME", nullable = false)
  private String name;

  @Column(name = "OFFICE_CODE", nullable = false)
  private String officeCode;

  @Column(name = "ADDRESS", nullable = false)
  private String address;

  @Builder(builderMethodName = "withDto")
  public School(SchoolRequest request) {
    type = switch (request.getType()) {
      case "초등학교" -> "EL";
      case "중학교" -> "MI";
      case "고등학교" -> "HI";
      default -> throw new IllegalStateException("Unexpected school type value: " + type);
    };

    name = request.getName();
    officeCode = request.getOfficeCode();
    address = request.getAddress();
  }

}
