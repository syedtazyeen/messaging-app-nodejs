import React, { useState } from "react";
import ChatListView from "../views/ChatListView";
import ChatView from "../views/ChatView";
import AddChatView from "../views/AddChatView";
import IconButton from "../components/common/buttons/IconButton";
import { useChat } from "../providers/ChatProvider";
import { useAuth } from "../providers/AuthProvider";

const MainScreen: React.FC = () => {
  const [currentTabId, setCurrentTabId] = useState(0);
  const { chatId , selectChat } = useChat()
  const { logout } = useAuth()
  
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-col gap-1 px-1 py-2 min-w-[3.5rem]">
        {navButtons.map(button => {
          if (button.id === 3) return (
            (
              <IconButton
                key={button.id}
                size="md"
                icon={button.icon}
                onClick={()=>{
                  selectChat(undefined ,undefined);
                  logout();
                }}
              />
            )
          )
          return (
            <IconButton
              key={button.id}
              size="md"
              active={currentTabId == button.id}
              icon={button.icon}
              onClick={() => setCurrentTabId(button.id)}
            />
          )
        })}
      </div>
      <div className="rounded-l-xl bg-gray-50 border-r w-[25%] min-w-[250px]">{getTabById(currentTabId)}</div>
      <div className="flex-grow bg-gray-50 w-[60%]">
        {chatId ?
          <ChatView />
          :
          <div className="w-full h-full flex justify-center items-center">
            <p className="opacity-50 text-sm font-medium">Messages</p>
          </div>
        }
      </div>
    </div>
  );
};

export default MainScreen;


const getTabById = (id: number) => {
  switch (id) {
    case 0:
      return <ChatListView />;
    case 1:
      return <AddChatView />;
    default:
      return null;
  }
};


const navButtons = [
  {
    id: 0,
    icon: '/icons/send.svg',
    label: 'Chats',
  },
  {
    id: 1,
    icon: '/icons/addUser.svg',
    label: 'Add',
  },
  {
    id: 2,
    icon: '/icons/settings.svg',
    label: 'Settings',
  },
  {
    id: 3,
    icon: '/icons/logout.svg',
    label: 'Logout',
  }
]