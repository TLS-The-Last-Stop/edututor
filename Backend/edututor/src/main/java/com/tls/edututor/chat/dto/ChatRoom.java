/*
package com.tls.edututor.chat.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tls.edututor.chat.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
  public enum MessageType {
    ENTER, TALK
  }

  private String roomId;
  private String name;
  @JsonIgnore
  private Set<WebSocketSession> sessions = new HashSet<>();

  @Builder
  public ChatRoom(String roomId, String name) {
    this.roomId = roomId;
    this.name = name;
  }

  public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
    if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
      sessions.add(session);
    }
    sendMessage(chatMessage, chatService);
  }

  public <T> void sendMessage(T message, ChatService chatService) {
    sessions.parallelStream().forEach(sessions -> chatService.sendMessage(sessions, message));
  }
}
*/
