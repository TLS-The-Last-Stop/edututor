package com.tls.edututor.exam.usertest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "USER_TEST")
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
public class UserTest extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "SHARE_TEST_ID", nullable = false)
  @JsonBackReference
  private ShareTest shareTest;

  @Column(name = "RESULT")
  private Double result;

  @OneToMany(mappedBy = "userTest", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<UserAnswer> userAnswers;
}