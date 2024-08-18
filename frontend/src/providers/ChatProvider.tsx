import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { io, Socket } from 'socket.io-client';
import { useAuth } from "./AuthProvider";
import axiosInstance from "../api";

// Define the shape of the context
interface ChatContextType {
    socket: Socket | undefined;
    chatId: string | undefined;
    contactName: string | undefined;
    chatList: any[];
    chatListLoading: boolean;
    fetchChats: () => void;
    selectChat: (chat: string | undefined, name: string | undefined) => void;
    clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);


export const ChatProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [chatId, setChatId] = useState<string | undefined>(undefined);
    const [contactName, setContactName] = useState<string | undefined>(undefined);
    const [chatListLoading, setChatListLoading] = useState<boolean>(false);
    const [chatList, setChatList] = useState<any[]>([]);
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const { token } = useAuth();

    const fetchChats = async () => {
        try {
            if (!token) return;
            setChatListLoading(true);
            const response = await axiosInstance.get('/chat/all');
            setChatList(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setChatListLoading(false);
        }
    };

    const selectChat = (chatId: string | undefined, contactName: string | undefined) => {
        setChatId(chatId);
        setContactName(contactName)
    };

    const clearChat = () => {
        setChatId(undefined);
        setContactName(undefined);
    };

    useEffect(() => {
        if (!token) return;
        fetchChats();
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    return (
        <ChatContext.Provider value={{ socket, chatId, contactName, chatList, chatListLoading, fetchChats, selectChat, clearChat }}>
            {children}
        </ChatContext.Provider>
    );
};

// Create a custom hook to use the chat context
export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};

// types.ts
export interface Chat {
    id: string;
    name: string;
    messages: string[];
}
