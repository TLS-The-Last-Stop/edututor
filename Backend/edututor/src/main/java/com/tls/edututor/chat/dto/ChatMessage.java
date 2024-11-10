package com.tls.edututor.chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMessage {
  public enum MessageType {
    ENTER, TALK
  }

  private MessageType type;
  private Long classroomId;
  private String sender;
  private String content;
  private String role;
  private LocalDateTime timestamp;
}