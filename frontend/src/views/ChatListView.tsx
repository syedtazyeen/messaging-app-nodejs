import React, { useEffect, useState } from "react";
import SearchBox from "../components/hoc/SearchBox";
import ChatItem from "../components/lists/ChatItem";
import { TagGroup } from "../components/common/tags";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useChat } from "../providers/ChatProvider";
import { useAuth } from "../providers/AuthProvider";

interface Chat {
  id: string;
  user1: string;
  user2: string;
  lastMessage: any;
  isTyping?: boolean;
}

const ChatListView: React.FC = () => {
  const { socket, fetchChats, chatListLoading: isLoading, chatList } = useChat();
  const { user: currentUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(tags[0].id);
  const [list, setList] = useState<Chat[]>(chatList);

  useEffect(() => {
    fetchChats();
  }, [currentUser])

  useEffect(() => {
    setList(chatList)
  }, [chatList])


  useEffect(() => {
    if (!socket) return;

    const handleMessage = ({ chatId, messageData }: { chatId: string; messageData: any }) => {
      setList((prevList) =>
        prevList.map((c) =>
          c.id === chatId
            ? { ...c, lastMessage: messageData, isTyping: false }
            : c
        )
      );
    };

    const handleUserTyping = ({ chatId, userId }: { chatId: string, userId: string }) => {
      console.log(chatId + "\n " + userId + " typing" + "\n" + currentUser?.id);

      setList((prevList) =>
        prevList.map((c) =>
          c.id === chatId && userId !== currentUser?.id
            ? { ...c, isTyping: true }
            : c
        )
      );
    };

    const handleUserStoppedTyping = ({ chatId, userId }: { chatId: string, userId: string }) => {
      console.log(chatId + "\n " + userId + " typing stop" + "\n" + currentUser?.id);
      setList((prevList) =>
        prevList.map((c) =>
          c.id === chatId && userId !== currentUser?.id
            ? { ...c, isTyping: false }
            : c
        )
      );
    };

    socket.on('receive-message', handleMessage);
    socket.on('user-typing', handleUserTyping);
    socket.on('user-stopped-typing', handleUserStoppedTyping);

    return () => {
      socket.off('receive-message', handleMessage);
      socket.off('user-typing', handleUserTyping);
      socket.off('user-stopped-typing', handleUserStoppedTyping);
    };
  }, [socket, currentUser]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full bg-gray-200 overflow-hidden">

            <img
              className="w-full h-full absolute inset-0 object-cover opacity-50"
              src='/icons/user.svg'
              alt="default avatar"
            />

          </div>
          <p className="text-xs font-medium">{currentUser?.username}</p>
        </div>

        <SearchBox value={searchInput} setValue={setSearchInput} />
        <TagGroup
          tags={tags}
          selectedTags={[selectedTagId]}
          setSelectedTags={setSelectedTagId}
        />
      </div>
      <div className="flex-1 overflow-y-scroll overflow-x-hidden w-full pb-4">
        {isLoading ? (
          <div className="w-full flex justify-center p-2">
            <LoadingSpinner color="black" />
          </div>
        ) : (
          <div className="h-fit bg-[#8b8b8be] divide-y divide-[#8b8b8b20]  border-[#8b8b8b20]">
            {list.length > 0 ? (
              list.map((item: any) => (
                <ChatItem key={item.id} data={item} />
              ))
            ) : (
              <p className="w-full text-center text-sm font-medium opacity-50">No contacts</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListView;

const tags: any = [
  {
    id: 0,
    label: "All",
    value: -1,
  },
  {
    id: 1,
    label: "Read",
    value: 2,
  },
  {
    id: 2,
    label: "Unread",
    value: 0,
  },
];
