package com.tls.edututor.exam.question.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.option.entity.Option;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "QUESTION")
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
public class Question extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "TEST_PAPER_ID", nullable = false)
  private TestPaper testPaper;

  @Column(name = "CONTENT", nullable = false)
  private String content;

  @Column(name = "TYPE")
  @Enumerated(EnumType.STRING)
  private QuestionType type;

  @Column(name = "PASSAGE")
  private String passage;

  @Column(name = "COMMENTARY", columnDefinition = "TEXT")
  private String commentary;

  @Column(name = "ANSWER_TEXT")
  private String answerText;

  @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Option> options = new ArrayList<>();

  @Column(name = "LEVEL")
  private Integer level;
}
