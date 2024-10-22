package com.tls.edututor.board.answer.entity;

import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "ANSWER")
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