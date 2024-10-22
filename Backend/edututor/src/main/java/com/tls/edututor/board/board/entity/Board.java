package com.tls.edututor.board.board.entity;

import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "BOARD")
public class Board extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "CATEGORY_ID", nullable = false)
  private Category category;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @Column(name = "CONTENT", nullable = false)
  private String content;

  @Column(name = "TYPE")
  private String type;
}
