package com.tls.edututor.chat.service.impl;

import com.tls.edututor.chat.dto.ChatMessage;
import com.tls.edututor.chat.entity.Chat;
import com.tls.edututor.chat.repository.ChatRepository;
import com.tls.edututor.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {
  private final ChatRepository chatRepository;

  @Transactional
  public void saveChat(ChatMessage message) {
    Chat chat = Chat.builder()
            .classroomId(message.getClassroomId())
            .sender(message.getSender())
            .content(message.getContent())
            .messageType(message.getType())
            .role(message.getRole())
            .sendDate(message.getTimestamp())
            .build();

    chatRepository.save(chat);
  }

  @Transactional(readOnly = true)
  public List<Chat> getChatsByClassroomId(Long classroomId) {
    return chatRepository.findByClassroomIdOrderBySendDateAsc(classroomId);
  }
}