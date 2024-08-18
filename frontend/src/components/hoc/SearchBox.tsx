import React from 'react'

interface IProps {
    value: string
    setValue: (value: string) => void
}

const SearchBox: React.FC<IProps> = ({ value, setValue }) => {
    return (
        <div className='flex gap-2 w-full bg-gray-200 rounded-full px-2 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500'>
            <img
                className='w-5 opacity-35'
                src='/icons/search.svg' />
            <input
                className='flex-1 outline-none bg-transparent text-sm font-medium min-w-[25px]'
                placeholder='Search'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            {value !== "" &&
                <img
                    onClick={() => setValue("")}
                    className='w-5 opacity-35 hover:opacity-70 cursor-pointer'
                     src='/icons/close.svg' />}
        </div>
    )
}

export default SearchBox