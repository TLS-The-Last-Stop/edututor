package com.tls.edututor.code.codegroup.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "CODE_GROUP")
public class CodeGroup extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "CODE_GROUP_NAME", nullable = false)
  private String CodeGroupName;
}
