package com.tls.edututor.board.category.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "CATEGORY")
public class Category extends BaseEntity {
  @Id
  @GeneratedValue
  @Column(name = "CATEGORY_ID")
  private Long id;

  @Column(name = "NAME")
  private String name;

  @Column(name = "DEPTH")
  private int depth;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "PARENT_ID")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Category parent;

  @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
  private List<Category> children = new ArrayList<>();
}