package com.tls.edututor.school.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.school.dto.request.SchoolRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE School SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
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
