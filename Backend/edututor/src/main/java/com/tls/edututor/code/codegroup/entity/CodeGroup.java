package com.tls.edututor.code.codegroup.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CODE_GROUP")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CodeGroup extends BaseEntity {

  @Id
  //@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "CODE_GROUP_NAME", nullable = false)
  private String codeGroupName;

  @Builder(builderMethodName = "withName")
  public CodeGroup(Long id, String codeGroupName) {
    this.id = id;
    this.codeGroupName = codeGroupName;
    //group.setWriter(10051L);
  }
}
