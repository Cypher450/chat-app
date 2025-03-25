import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import useChatContext from "../context/ChatContext";
import { getMessage } from "../services/RoomService";

const ChatPage = () => {
  const { roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser } = useChatContext();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Styles
  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      backgroundColor: '#1e293b'
    },
    header: {
      borderBottom: '1px solid #374151',
      height: '80px',
      backgroundColor: '#111827',
      position: 'fixed',
      width: '100%',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      top: 0,
      color: 'white'
    },
    main: {
      padding: '80px 0 64px',
      margin: '0 auto',
      width: '66.666667%',
      height: 'calc(100vh - 144px)',
      overflow: 'auto',
      backgroundColor: '#1e293b'
    },
    messageContainer: {
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'flex-start'
    },
    currentUserMessage: {
      justifyContent: 'flex-end'
    },
    messageBubble: {
      border: '1px solid #374151',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      padding: '12px',
      borderRadius: '12px',
      backgroundColor: '#1f2937',
      maxWidth: '70%'
    },
    currentUserBubble: {
      backgroundColor: '#2563eb',
      borderColor: '#1e40af'
    },
    senderName: {
      fontSize: '14px', 
      fontWeight: 'bold', 
      margin: 0,
      color: '#60a5fa'
    },
    currentUserName: {
      color: 'white'
    },
    messageContent: {
      margin: 0,
      color: 'white'
    },
    inputContainer: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '64px',
      backgroundColor: '#111827',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1000
    },
    inputWrapper: {
      width: '66.666667%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '0 20px'
    },
    input: {
      flex: 1,
      height: '40px',
      border: '1px solid #1f2937',
      borderRadius: '20px',
      backgroundColor: '#1f2937',
      padding: '0 16px',
      color: 'white',
      outline: 'none',
      fontSize: '16px'
    },
    button: {
      backgroundColor: '#10b981',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      border: 'none',
      cursor: 'pointer',
      color: 'white'
    },
    leaveButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messageData = await getMessage(roomId);
        setMessages(messageData);
      } catch (error) {
        console.error("Error loading messages:", error);
        toast.error("Failed to load messages");
      }
    };

    if (connected && roomId) {
      loadMessages();
    }
  }, [roomId, connected]);

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages(prev => [...prev, newMessage]);
        });
      }, (error) => {
        console.error("WebSocket connection error:", error);
        toast.error("Connection error");
      });
    };

    if (connected && roomId) {
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomId, connected]);

  const sendMessage = async () => {
    if (!stompClient || !connected || !input.trim()) return;

    const message = {
      sender: currentUser,
      content: input,
      roomId: roomId,
      timestamp: new Date().toISOString()
    };

    try {
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setInput("");
      inputRef.current.focus();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleLogout = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
            Room: <span style={{ color: '#60a5fa' }}>{roomId}</span>
          </h1>
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
            User: <span style={{ color: '#60a5fa' }}>{currentUser}</span>
          </h1>
        </div>
        <div>
          <button onClick={handleLogout} style={styles.leaveButton}>
            Leave Room
          </button>
        </div>
      </header>

      {/* Messages */}
      <main style={styles.main} ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            style={{
              ...styles.messageContainer,
              ...(message.sender === currentUser && styles.currentUserMessage)
            }}
          >
            <div style={{
              ...styles.messageBubble,
              ...(message.sender === currentUser && styles.currentUserBubble)
            }}>
              <p style={{
                ...styles.senderName,
                ...(message.sender === currentUser && styles.currentUserName)
              }}>
                {message.sender}
              </p>
              <p style={styles.messageContent}>{message.content}</p>
              {message.timestamp && (
                <small style={{ 
                  fontSize: '12px',
                  color: message.sender === currentUser ? '#bfdbfe' : '#9ca3af',
                  textAlign: 'right'
                }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Message Input */}
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Type a message..."
            ref={inputRef}
            style={styles.input}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={styles.button}>
              <MdAttachFile size={20} />
            </button>
            <button onClick={sendMessage} style={styles.button}>
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;