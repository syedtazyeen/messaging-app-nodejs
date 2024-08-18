import React, { useEffect, useState } from "react";
import { useChat } from "../../providers/ChatProvider";
import { useAuth } from "../../providers/AuthProvider";

interface Chat {
    id: string;
    contactName: string;
    avatarPath: string;
    lastMessage: any;
    unreadCount: number;
    isTyping?: boolean;
}

const ChatItem: React.FC<{ data: Chat }> = ({ data }) => {
    const { chatId: selectedChatId, selectChat } = useChat();
    const { user } = useAuth();
    const [userImg, setUserImg] = useState(data?.avatarPath);
    const [userImgError, setUserImgError] = useState(false);

    useEffect(() => {
        if (userImgError) {
            setUserImg(defaultImg);
        }
    }, [userImgError]);

    return (
        <div
            onClick={() => selectChat(data.id, data.contactName)}
            className={`flex h-[4rem] cursor-pointer hover:bg-[#8b8b8b20] ${selectedChatId === data.id ? "bg-gray-100" : ""}`}
        >
            <div
                className={`h-full w-1 rounded-l-lg ${selectedChatId === data.id ? "bg-orange-500" : "bg-transparent"}`}
            />
            <div className="p-1 flex gap-3 items-center">
                <div className="relative">
                    <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            className={`w-full h-full`}
                            src={userImg}
                            onError={() => setUserImgError(true)}
                        />
                        {userImgError && (
                            <img
                                className="w-full h-full absolute inset-0 object-cover opacity-50"
                                src={defaultImg}
                                alt="default avatar"
                            />
                        )}
                    </div>
                    {data.lastMessage?.senderId !== user?.id &&
                        data.lastMessage?.status === "unread" && (
                            <div className="absolute top-1 right-0 w-2 h-2 rounded-full bg-orange-500" />
                        )}
                </div>
                <div className="h-full flex-grow flex flex-col justify-center">
                    <p className="text-sm font-medium opacity-80">{data.contactName}</p>
                    {data.isTyping ? (
                        <p className="text-sm font-medium text-primaryDark">typing...</p>
                    ) : data.lastMessage ? (
                        <div className="flex gap-1 w-full items-center text-sm">
                            {data.lastMessage?.userId === user?.id && (
                                <p className="opacity-50">You:</p>
                            )}
                            <p
                                className={`line-clamp-1 ${data.lastMessage?.status === "unread" ? "opacity-80" : "opacity-50"}`}
                            >
                                {data.lastMessage?.file ?
                                    "Photo" :
                                    data?.lastMessage?.text}
                            </p>
                        </div>
                    ) : (
                        <p className="opacity-50 text-sm">Send a message</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatItem;

const defaultImg = "/icons/user.svg";
