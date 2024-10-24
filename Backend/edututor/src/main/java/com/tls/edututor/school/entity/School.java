package com.tls.edututor.school.entity;

import com.tls.edututor.school.dto.request.SchoolRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class School {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String type;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String officeCode;

  @Column(nullable = false)
  private String address;

  @Builder(builderMethodName = "withDto")
  public School(SchoolRequest request) {
    type = request.getType();
    name = request.getName();
    officeCode = request.getOfficeCode();
    address = request.getAddress();
  }

}
