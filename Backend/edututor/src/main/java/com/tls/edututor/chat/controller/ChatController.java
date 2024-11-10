package com.tls.edututor.chat.controller;

import com.tls.edututor.chat.dto.ChatMessage;
import com.tls.edututor.chat.entity.Chat;
import com.tls.edututor.chat.service.ChatService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
  private final ChatService chatService;

  @MessageMapping("/chat.send/{classroomId}")
  @SendTo("/topic/chat/{classroomId}")
  public ChatMessage sendMessage(@Payload ChatMessage message,
                                 @DestinationVariable Long classroomId,
                                 SimpMessageHeaderAccessor headerAccessor) {
    message.setTimestamp(LocalDateTime.now());
    chatService.saveChat(message);
    return message;
  }

  @MessageMapping("/chat.enter/{classroomId}")
  @SendTo("/topic/chat/{classroomId}")
  public ChatMessage enterChatRoom(@Payload ChatMessage message,
                                   @DestinationVariable Long classroomId,
                                   SimpMessageHeaderAccessor headerAccessor) {

    // 웹소켓 세션에 유저 정보 저장
    headerAccessor.getSessionAttributes().put("username", message.getSender());
    headerAccessor.getSessionAttributes().put("classroomId", classroomId);

    message.setType(ChatMessage.MessageType.ENTER);
    message.setTimestamp(LocalDateTime.now());

    chatService.saveChat(message);
    return message;
  }

  // 채팅 내역 조회 API
  @GetMapping("/chat/{classroomId}")
  public CommonApiResponse<List<Chat>> getClassroomChat(@PathVariable Long classroomId) {
    log.debug("채팅 내역 조회 요청: classroomId: {}", classroomId);
    return CommonApiResponse.createCreated("채팅입니다~", chatService.getChatsByClassroomId(classroomId));
  }
}