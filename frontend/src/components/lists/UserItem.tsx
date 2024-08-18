import React, { useState } from "react";
import { Button } from "../common/buttons";
import axiosInstance from "../../api";

interface IProp {
    data: User;
    isAdded: boolean;
}

interface User {
    id: string;
    username: string;
    avatarPath: string;
    email: string;
}

const UserItem: React.FC<IProp> = (props) => {
    const [userImg, setUserImg] = useState(props.data.avatarPath);
    const [userImgError, setUserImgError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(props.isAdded);

    const handleAddContact = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/chat/create', {
                contactId: props.data.id
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setIsAdded(true);
        }
    }

    return (
        <div className="flex h-[4rem]">
            <div className="p-1 px-2 flex gap-3 items-center w-full">
                <div className="relative">
                    <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            className={`w-full h-full ${userImgError && "absolute bottom-[-7px] opacity-50"}`}
                            src={userImg}
                            onError={() => {
                                setUserImg(defaultImg);
                                setUserImgError(true);
                            }}
                            alt="user avatar"
                        />
                    </div>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                    <p className="text-sm font-medium opacity-80">
                        {props.data.username}
                    </p>
                    <p className="text-xs font-medium opacity-50">
                        {props.data.email}
                    </p>
                </div>
                {!isAdded ?
                    <Button
                        isLoading={isLoading}
                        onClick={handleAddContact}
                        variant="secondary">
                        <div className="flex gap-1 text-xs font-medium opacity-50">
                            <img className="w-4" src="/icons/addUser.svg" />
                            <p>Add</p>
                        </div>
                    </Button>
                    : (
                        <Button variant='secondary' className="cursor-default">
                            <div className="flex gap-1 text-xs text-green-600 font-medium">
                                <p>Added</p>
                            </div>
                        </Button>
                    )}
            </div>
        </div>
    );
};

export default UserItem;

const defaultImg = "/icons/user.svg";
