import React from "react";

interface ChatHeaderProps {
  contactName: string | undefined;
  userImg?: string;
  userImgError: boolean;
  isTyping: boolean;
  onUserImgError: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isTyping, contactName, userImg, userImgError, onUserImgError }) => (
  <div className="flex flex-col w-full px-3 mb-1">
    <div className="flex items-center gap-2 font-medium h-[3.5rem]">
      <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img
          className={`w-full h-full ${userImgError ? "absolute bottom-[-7px] opacity-50" : ""}`}
          src={userImg}
          onError={onUserImgError}
        />
      </div>
      <div>
        <p className={`transition duration-200 ${!isTyping && 'text-xs'}`}>{contactName}</p>
        <p className={`text-sm font-medium text-primaryDark ${!isTyping ? 'opacity-100 h-fit' : 'opacity-0 h-0'}`}>Typing...</p>
      </div>
    </div>

  </div>
);

export default ChatHeader;
