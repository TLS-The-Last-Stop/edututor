package com.tls.edututor.board.answer.entity;

import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "ANSWER")
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
public class Answer extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "BOARD_ID", nullable = false)
  private Board board;

  @Column(name = "CONTENT")
  private String content;
}