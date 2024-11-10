import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { webSocket } from '../../api/chat/websocket';
import '../../assets/css/FloatingChat.css';
import { useAuth } from '../../utils/AuthContext.jsx';

const FloatingChat = () => {
  const { classroomId } = useParams();
  const { userInfo } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionError, setConnectionError] = useState(null);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket 연결 및 구독 설정
  useEffect(() => {
    if (!isOpen) return;

    const connectWebSocket = async () => {
      try {
        setIsConnecting(true);
        await webSocket.connect(userInfo.token);

        // 채팅방 입장
        webSocket.enterChatRoom(classroomId, {
          classroomId,
          sender: userInfo.username,
          role: userInfo.role,
          type: 'ENTER',
          content: `${userInfo.username}님이 입장하셨습니다.`
        });

        // 메시지 구독
        webSocket.subscribe(classroomId, (message) => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            content: message.content,
            sender: message.sender,
            timestamp: new Date().toLocaleTimeString(),
            type: message.type
          }]);
        });

        setIsConnecting(false);
        setConnectionError(null);
      } catch (error) {
        console.error('WebSocket 연결 실패:', error);
        setConnectionError('채팅 연결에 실패했습니다. 다시 시도해주세요.');
        setIsConnecting(false);
      }
    };

    connectWebSocket();

    // Clean up
    return () => {
      webSocket.unsubscribe(classroomId);
      webSocket.disconnect();
    };
  }, [isOpen, classroomId, userInfo]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    try {
      webSocket.sendMessage(classroomId, {
        classroomId,
        sender: userInfo.username,
        role: userInfo.role,
        type: 'TALK',
        content: inputMessage
      });

      setInputMessage('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setConnectionError('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="floating-chat-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>채팅</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
            </button>
          </div>

          <div className="message-area">
            {isConnecting ? (
              <div className="message-area-empty">
                <p>연결 중...</p>
              </div>
            ) : connectionError ? (
              <div className="message-area-empty error">
                <p>{connectionError}</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="message-area-empty">
                <p>메시지를 입력하세요.</p>
              </div>
            ) : (
              <div className="messages-container">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === userInfo.username ? 'user' : ''} ${message.type.toLowerCase()}`}
                  >
                    {message.type === 'ENTER' ? (
                      <div className="message-content system">
                        <p>{message.content}</p>
                      </div>
                    ) : (
                      <div className="message-content">
                        <div className="message-sender">{message.sender}</div>
                        <p>{message.content}</p>
                        <span className="message-timestamp">
                          {message.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            )}
          </div>

          <div className="input-area">
            <div className="input-container">
              <input
                type="text"
                className="message-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지를 입력하세요..."
                disabled={isConnecting || !!connectionError}
              />
              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={isConnecting || !!connectionError}
              >
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={`toggle-chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
      </button>
    </div>
  );
};

export default FloatingChat;