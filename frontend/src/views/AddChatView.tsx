import React, { useEffect, useState } from 'react'
import SearchBox from '../components/hoc/SearchBox';
import axiosInstance from '../api';
import UserItem from '../components/lists/UserItem';
import { useAuth } from '../providers/AuthProvider';

const AddChatView: React.FC = () => {
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [contactList, setContactList] = useState<any[]>([]);
    const { user } = useAuth();

    const fetchChats = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/chat/all');
            setContactList(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async (query: string) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("user?search=" + query);
            // Exclude users already in the contact list
            const filteredUsers = response.data.data;
            setSearchList(filteredUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchChats();
    }, [])

    useEffect(() => {
        if (searchInput === "") return;
        fetchUsers(searchInput.trim().toLowerCase())
    }, [searchInput])

    return (
        <div className="h-full flex flex-col">
            <div className="p-3 flex flex-col gap-2">
                <SearchBox value={searchInput} setValue={setSearchInput} />
            </div>
            <div className="flex-1 overflow-y-scroll pb-4">
                <div className="h-fit bg-[#8b8b8be] divide-y divide-[#8b8b8b20] border-y border-[#8b8b8b20]">
                    {isLoading ? <Placeholder text='Searching...' /> :
                        (searchList.length > 0 ? <>{
                            searchList.map((listUser: any, index) => (
                                (user?.id !== listUser.id) &&
                                <UserItem
                                    key={index}
                                    data={listUser}
                                    isAdded={contactList.find(chat => chat.contactId === listUser.id)}
                                />
                            ))
                        }</> : <Placeholder text='No users found' />)
                    }
                </div>
            </div>
        </div>
    )
}

export default AddChatView;

const Placeholder: React.FC<{ text: string }> = ({ text }) => {
    return (
        <p className='w-full opacity-50 font-medium text-sm p-2 text-center'>{text}</p>
    )
}
