package com.tls.edututor.chat.service;

import com.tls.edututor.chat.dto.ChatMessage;
import com.tls.edututor.chat.entity.Chat;

import java.util.List;

public interface ChatService {
  void saveChat(ChatMessage chatMessage);

  List<Chat> getChatsByClassroomId(Long classroomId);
}