package com.tls.edututor.board.board.entity;

import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;


@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE BOARD SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
@Table(name = "BOARD")
public class Board extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @Column(name = "CONTENT", nullable = false)
  private String content;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "CATEGORY_ID", nullable = false)
  private Category category;
}