import React, { useEffect, useState } from "react";
import { useChat } from "../providers/ChatProvider";
import { useAuth } from "../providers/AuthProvider";
import { Message } from "../types";
import MessageInput from "../components/hoc/MessageInput";
import MessageList from "../components/hoc/MessageList";
import ChatHeader from "../components/hoc/ChatHeader";

const ChatView: React.FC = () => {
  const { chatId, contactName, socket } = useChat();
  const { user } = useAuth();
  const [userImg, setUserImg] = useState<string | undefined>(undefined);
  const [userImgError, setUserImgError] = useState(false);
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [otherUserTyping, setOtherUserTyping] = useState<string | null>(null);

  const typingTimeoutRef = React.useRef<number | undefined>(undefined);

  useEffect(() => {
    if (socket) {
      if (chatId && user) {
        socket.emit('join-chat', chatId, user.id);
        setMessages([]);
      }

      const handleMessage = (messageData: any) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };

      const handleHistory = (data: Message[]) => {
        setMessages(data);
      };

      const handleUserTyping = ({ userId }: { userId: string }) => {
        if (userId !== user?.id) {
          setOtherUserTyping(userId);
        }
      };

      const handleUserStoppedTyping = ({ userId }: { userId: string }) => {
        if (userId !== user?.id) {
          setOtherUserTyping(null);
        }
      };

      socket.on('receive-message', handleMessage);
      socket.on('receive-history', handleHistory);
      socket.on('user-typing', handleUserTyping);
      socket.on('user-stopped-typing', handleUserStoppedTyping);

      return () => {
        socket.off('receive-message', handleMessage);
        socket.off('receive-history', handleHistory);
        socket.off('user-typing', handleUserTyping);
        socket.off('user-stopped-typing', handleUserStoppedTyping);
      };
    }
  }, [socket, chatId, user]);

  useEffect(() => {
    if (socket && chatId && user) {
      if (isTyping) {
        socket.emit('start-typing', { chatId, userId: user.id });
      } else {
        socket.emit('stop-typing', { chatId, userId: user.id });
      }
    }
  }, [isTyping, socket]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(event.target.value);
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleChangeFile = (file: any) => {
    setFile(file);
  };

  // Clear timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const sendMessage = () => {
    if (!user || !socket || !chatId) return;
    const messageData: any = {
      text: text,
      userId: user.id,
      contentType: 'text',
    };

    console.log(file);

    if (file &&
      (file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'image/aivf')) {
      messageData.contentType = 'image'
      messageData.file = file
    }


    if (!messageData) return;
    socket.emit('send-message', { chatId, userId: user.id, messageData }, (response: any) => {
      console.log(response);
      setMessages((prevMessages) => [...prevMessages, response]);
    })
    setText('');
    setFile(undefined);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <ChatHeader
        contactName={contactName}
        userImg={userImg}
        userImgError={userImgError}
        isTyping={!otherUserTyping}
        onUserImgError={() => {
          setUserImg(undefined);
          setUserImgError(true);
        }}
      />
      <div className="mx-3 mb-2 h-[calc(100% - 3.5rem)] rounded-lg flex flex-col flex-grow bg-gray-50 border border-gray-200">
        <MessageList messages={messages} isLoading={false} />
        <MessageInput
          text={text}
          file={file}
          onChangeText={handleChange}
          onChangeFile={handleChangeFile}
          onSend={sendMessage}
          isDisabled={text === ""}
        />
      </div>
    </div>
  );
};

export default ChatView;
