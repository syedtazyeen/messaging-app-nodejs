import React from "react";

interface IProp {
    id: string;
    label: string;
    active?: boolean;
}

const Tag: React.FC<IProp> = (props) => {
    return (
        <div
            className={`px-3 py-1 text-[13px] font-medium cursor-pointer rounded-full ${props.active ? "text-white bg-orange-500" : "text-[#8b8b8b] bg-gray-200"}`}
        >
            {props.label}
        </div>
    );
};

export default Tag;
