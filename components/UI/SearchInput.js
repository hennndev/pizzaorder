import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({value, setValue, handleChange, placeholder}) => {
  return (
    <div className='flex items-center space-x-3 bg-white w-full md:w-[500px] px-3 text-gray-500 rounded' data-aos='fade-up' data-aos-delay='300'>
        <BiSearch className='text-xl'/>
        <input 
            type="text" 
            value={value}
            onChange={handleChange}
            placeholder={placeholder} 
            className='py-2 outline-none flex-1 text-sm md:text-[15px]'/>
        {value && <AiOutlineClose className='text-red-500 text-lg cursor-pointer' onClick={() => setValue('')}/>}
    </div>
  )
};

export default SearchInput;
