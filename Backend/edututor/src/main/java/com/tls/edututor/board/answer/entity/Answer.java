package com.tls.edututor.board.answer.entity;

import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Entity
@Table(name = "ANSWER")
@SQLDelete(sql = "UPDATE ANSWER SET is_deleted = true WHERE id = ?")
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