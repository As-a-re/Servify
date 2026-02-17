import React, { useState } from 'react';
import styles from './Messages.module.css';

interface Message {
  id: number;
  sender: 'user' | 'doctor';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  doctorName: string;
  specialty: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  avatar: string;
}

export const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'OB/GYN',
      lastMessage: 'Everything looks great! See you next week.',
      lastMessageTime: '2 hours ago',
      unread: true,
      avatar: '👩‍⚕️',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Nutritionist',
      lastMessage: 'Please increase your calcium intake.',
      lastMessageTime: '1 day ago',
      unread: false,
      avatar: '👨‍⚕️',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Mental Health',
      lastMessage: 'You're doing great! Keep up the exercises.',
      lastMessageTime: '3 days ago',
      unread: false,
      avatar: '👩‍⚕️',
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: 'doctor',
      content: 'Hi! How are you feeling today?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      sender: 'user',
      content: 'Good, just a bit tired. Is that normal?',
      timestamp: '10:35 AM',
    },
    {
      id: 3,
      sender: 'doctor',
      content: 'Completely normal in your stage of pregnancy. Make sure to get enough rest.',
      timestamp: '10:40 AM',
    },
    {
      id: 4,
      sender: 'user',
      content: 'Thank you, doctor. I feel much better knowing that.',
      timestamp: '10:45 AM',
    },
    {
      id: 5,
      sender: 'doctor',
      content: 'Everything looks great! See you next week.',
      timestamp: '11:00 AM',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  if (selectedConversation) {
    const conversation = conversations.find((c) => c.id === selectedConversation);

    return (
      <div className={styles.container}>
        {/* Chat Header */}
        <div className={styles.chatHeader}>
          <button
            className={styles.backButton}
            onClick={() => setSelectedConversation(null)}
          >
            ←
          </button>
          <div className={styles.chatHeaderInfo}>
            <p className={styles.doctorName}>{conversation?.doctorName}</p>
            <p className={styles.specialty}>{conversation?.specialty}</p>
          </div>
          <button className={styles.moreButton}>⋮</button>
        </div>

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
              <div className={styles.messageBubble}>
                <p className={styles.messageContent}>{msg.content}</p>
                <span className={styles.messageTime}>{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className={styles.messageInput}
          />
          <button type="submit" className={styles.sendButton}>
            ➤
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Messages</h1>
        <p className={styles.subtitle}>Chat with your healthcare providers</p>
      </header>

      {/* Conversations List */}
      <div className={styles.conversationsList}>
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className={`${styles.conversationItem} ${conv.unread ? styles.unread : ''}`}
            onClick={() => setSelectedConversation(conv.id)}
          >
            <div className={styles.conversationAvatar}>{conv.avatar}</div>
            <div className={styles.conversationInfo}>
              <p className={styles.conversationDoctor}>{conv.doctorName}</p>
              <p className={styles.conversationSpecialty}>{conv.specialty}</p>
              <p className={styles.conversationMessage}>{conv.lastMessage}</p>
            </div>
            <div className={styles.conversationMeta}>
              <p className={styles.conversationTime}>{conv.lastMessageTime}</p>
              {conv.unread && <div className={styles.unreadBadge}></div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Messages;
