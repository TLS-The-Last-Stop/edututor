package com.tls.edututor.exam.sharetest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "SHARE_TEST")
@SQLDelete(sql = "update share_test st set st.is_deleted = true where st.id = ?")
@SQLRestriction("is_deleted = false")
public class ShareTest extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "TEST_PAPER_ID", nullable = false)
  @JsonBackReference
  private TestPaper testPaper;

  @OneToMany(mappedBy = "shareTest", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<UserTest> userTests;

  @Column(name = "DEADLINE")
  private LocalDateTime deadline;

  /*
  @Override
  public void setWriter(Long writer) {
    super.setWriter(writer);
  }*/
}