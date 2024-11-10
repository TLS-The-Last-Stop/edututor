package com.tls.edututor.chat.repository;

import com.tls.edututor.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
  List<Chat> findByClassroomIdOrderBySendDateAsc(Long classroomId);
}