import React from 'react'
import { useAuth } from '../../providers/AuthProvider'

const MessageItem: React.FC<{ message: any }> = ({ message }) => {
    const { user } = useAuth();
    return (
        <div className={`w-full p-1 flex ${message?.userId === user?.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] flex flex-col w-fit ${message?.userId === user?.id ? 'bg-primary' : 'justify-start'}  overflow-hidden ${message?.userId === user?.id ? 'bg-primary text-white rounded-l-xl rounded-tr-xl rounded-br-sm' : 'bg-gray-200 rounded-r-xl rounded-tl-xl rounded-bl-sm'}`}>
                {message?.file && <img className='max-w-[250px] bg-gray-300' src={message.file} />}
                {message?.text !== "" &&
                    <div className={`w-auto max-w-[80%] py-2 px-2 ${message?.userId === user?.id ? ' text-white rounded-l-xl rounded-tr-xl rounded-br-sm' : ' rounded-r-xl rounded-tl-xl rounded-bl-sm'}`}>
                        {message?.text}
                    </div>}
            </div>
        </div>
    )
}

export default MessageItem
