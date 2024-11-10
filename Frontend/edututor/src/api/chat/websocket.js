import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocket {
  constructor() {
    this.client = null;
    this.subscriptions = new Map();
    this.messageHandlers = new Map();
  }

  connect(token) {
    return new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws/chat'),
        connectHeaders: {
          Authorization: `Bearer ${token}`
        },
        debug: function(str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      });

      this.client.onConnect = () => {
        console.log('WebSocket 연결 성공!');
        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('WebSocket 에러:', frame);
        reject(frame);
      };

      this.client.onWebSocketError = (event) => {
        console.error('WebSocket 에러:', event);
        reject(event);
      };

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }

  subscribe(classroomId, messageHandler) {
    if (!this.client || !this.client.connected) {
      throw new Error('WebSocket이 연결되어 있지 않습니다.');
    }

    const subscription = this.client.subscribe(
      `/topic/chat/${classroomId}`,
      (message) => {
        const messageData = JSON.parse(message.body);
        messageHandler(messageData);
      }
    );

    this.subscriptions.set(classroomId, subscription);
    this.messageHandlers.set(classroomId, messageHandler);
  }

  unsubscribe(classroomId) {
    const subscription = this.subscriptions.get(classroomId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(classroomId);
      this.messageHandlers.delete(classroomId);
    }
  }

  sendMessage(classroomId, message) {
    if (!this.client || !this.client.connected) {
      throw new Error('WebSocket이 연결되어 있지 않습니다.');
    }

    this.client.publish({
      destination: `/app/chat.send/${classroomId}`,
      body: JSON.stringify(message)
    });
  }

  enterChatRoom(classroomId, userData) {
    if (!this.client || !this.client.connected) {
      throw new Error('WebSocket이 연결되어 있지 않습니다.');
    }

    this.client.publish({
      destination: `/app/chat.enter/${classroomId}`,
      body: JSON.stringify(userData)
    });
  }
}

export const webSocket = new WebSocket();