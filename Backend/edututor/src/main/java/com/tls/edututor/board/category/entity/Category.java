package com.tls.edututor.board.category.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CATEGORY")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "CATEGORY_NAME", nullable = false)
  private String categoryName;

}
