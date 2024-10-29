package com.tls.edututor.code.codegroup.entity;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "CODE_GROUP")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class CodeGroup extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "CODE_GROUP_NAME")
  private String codeGroupName;

  @OneToMany(mappedBy = "codeGroup", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<CodeDetail> codeDetails;
}
