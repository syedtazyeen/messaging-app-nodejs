import React, { useEffect, useRef } from "react";
import { Message } from "../../types";
import MessageItem from "./MessageItem";
import LoadingSpinner from "../common/LoadingSpinner";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex-grow h-[50vh] overflow-y-scroll pb-4">
      {isLoading ? (
        <div className="w-full flex justify-center p-2">
          <LoadingSpinner color="black" />
        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <MessageItem key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;
