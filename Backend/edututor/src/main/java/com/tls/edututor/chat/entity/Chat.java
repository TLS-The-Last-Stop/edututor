package com.tls.edututor.chat.entity;

import com.tls.edututor.chat.dto.ChatMessage;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Chat extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long classroomId;

  @Column(nullable = false)
  private String sender;

  @Column(nullable = false)
  private String content;

  @Enumerated(EnumType.STRING)
  private ChatMessage.MessageType messageType;

  private String role;

  private LocalDateTime sendDate;

  @Builder
  public Chat(Long classroomId, String sender, String content,
              ChatMessage.MessageType messageType, String role, LocalDateTime sendDate) {
    this.classroomId = classroomId;
    this.sender = sender;
    this.content = content;
    this.messageType = messageType;
    this.role = role;
    this.sendDate = sendDate;
  }
}