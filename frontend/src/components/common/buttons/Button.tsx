import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
    rounded?: boolean;
    width?: 'full' | 'fit';
}

const Button: React.FC<IProp> = ({
    isLoading = false,
    variant = 'primary',
    rounded = true,
    width = 'fit',
    className,
    disabled,
    children,
    ...rest
}) => {
    const color = variant === 'primary'
        ? 'bg-orange-500 text-white'
        : 'bg-gray-200  text-black';

    return (
        <button
            className={`flex justify-center items-center text-sm font-medium px-4 opacity-90 disabled:opacity-75 hover:opacity-95 rounded-full h-9 w-${width} rounded-${rounded ? 'full' : 'md'} ${color} ${className || ''}`}
            disabled={disabled}
            {...rest}
        >
            {isLoading ? <LoadingSpinner /> : <div>{children}</div>}
        </button>
    );
}

export default Button;
