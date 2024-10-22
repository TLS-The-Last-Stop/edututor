package com.tls.edututor.code.codedetail.entity;

import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "CODE_DETAIL")
public class CodeDetail extends BaseEntity {

  @Id
  private String id;

  @ManyToOne
  @JoinColumn(name = "CODE_GROUP_ID", nullable = false)
  private CodeGroup codeGroup;

  @Column(name = "CODE_DETAIL_VALUE", nullable = false)
  private String CodeDetailValue;
}
