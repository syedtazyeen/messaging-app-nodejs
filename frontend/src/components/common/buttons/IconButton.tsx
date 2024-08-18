import React from "react";

const sizeClasses = {
    xs: "w-4 h-4 text-xs",
    sm: "w-5 h-5 text-sm",
    md: "w-6 h-6 text-base",
    lg: "w-8 h-8 text-lg",
};

const IconButton: React.FC<{
    active?: boolean;
    icon: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    label?: string;
    onClick?: () => void;
}> = ({ icon, onClick, label, size = "xs", active = false }) => {
    const sizeClass = sizeClasses[size];

    return (
        <button
            className={`flex flex-col items-center p-1.5 ${active ? "" : "opacity-40"}`}
            onClick={onClick}
        >
            <div className={`flex gap-1 items-center p-1.5 rounded-full ${active ? "bg-primary" : onClick ? "bg-gray-50 hover:bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}>
                <img className={`${sizeClass} ${active ? "invert-[100]" : ""}`} src={icon} alt="icon" />
                {label && <p className={`px-1 font-semibold text-${size}`}>{label}</p>}
            </div>
        </button>
    );
};

export default IconButton;
