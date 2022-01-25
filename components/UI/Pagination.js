import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Pagination = ({setPage, page, dataLength}) => {

    const handleNext = () => {
        if(!dataLength) {
            setPage(page + 1)
        } 
    }

    const handlePrev = () => {
        if(page !== 1) {
            setPage(page - 1)
        }
    }

    return <div className='flex items-center bg-gray-100 text-gray-800 shadow-lg text-sm rounded overflow-hidden' data-aos='fade-up' data-aos-delay='500'>
        <div className={`flex ${page <= 1 && 'bg-gray-300 hover:bg-gray-300 hover:text-gray-800 cursor-not-allowed'} items-center space-x-2 border-r border-gray-300 px-3 py-[7px] hover:bg-primary hover:text-white cursor-pointer`} onClick={handlePrev}>
            <MdKeyboardArrowLeft/>
            <p>Prev</p>
        </div>
        <span className='px-4 font-semibold'>{page}</span>
        <div className={`flex ${dataLength && 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed hover:text-gray-800' } items-center space-x-2 border-l border-gray-300 px-3 py-[7px] hover:bg-primary hover:text-white cursor-pointer`} onClick={handleNext}>
            <p>Next</p>
            <MdKeyboardArrowRight/>
        </div>
    </div>
};

export default Pagination;
