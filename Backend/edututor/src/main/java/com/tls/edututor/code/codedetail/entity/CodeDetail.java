package com.tls.edututor.code.codedetail.entity;

import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CODE_DETAIL")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CodeDetail extends BaseEntity {

  @Id
  private String id;

  @ManyToOne
  @JoinColumn(name = "CODE_GROUP_ID", nullable = false)
  private CodeGroup codeGroup;

  @Column(name = "CODE_DETAIL_VALUE", nullable = false)
  private String codeDetailValue;

  @Builder(builderMethodName = "withCode")
  public CodeDetail(String id, CodeGroup codeGroup, String codeDetailValue) {
    this.id = id;
    this.codeGroup = codeGroup;
    this.codeDetailValue = codeDetailValue;
    //group.setWriter(10051L);
  }

}
