import React from 'react'
import Image from 'next/image'
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'



const CartItem = ({item, handleDelete, handleIncrement, handleDecrement, setIsNote}) => {

    return (
        <div className='shadow-lg bg-[#202020] rounded p-5 min-h-[250px] flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mb-5'>
            <div className="flex-center">
                <div className='relative h-[200px] w-[200px] flex-center'>
                    <Image src={item.gambar.gambarURL} layout='fill' objectFit='contain'/>
                </div>
            </div>
            <div className='flex justify-between flex-col flex-grow'>
                <div className='flex flex-col space-y-3'>
                    <div className="flex-between">
                        <h1 className='text-xl md:text-2xl font-medium'>{item.nama}</h1>
                        <h1 className='text-xl md:text-2xl font-bold primary-text'>
                            Rp {item.harga * item.count}K 
                        </h1>
                    </div>
                    <p className='text-gray-500'>{item.deskripsi}</p>
                    <div className='flex items-center space-x-3 text-gray-300'>
                        <AiOutlineMinusSquare className='text-2xl' onClick={handleDecrement}/>
                        <span>{item.count}</span>
                        <AiOutlinePlusSquare className='text-2xl' onClick={handleIncrement}/>
                    </div>
                    {item.note && (
                        <div className='flex items-center text-gray-500'>
                            <AiOutlineCheck className='mr-1 text-sm'/>
                            noted
                        </div>
                    )}
                </div>
                <div className="flex-between mt-5">
                    <button className='btn bg-blue-500 hover:bg-blue-600 flex items-center' onClick={() => setIsNote(item)}>
                        {!item.note && <AiOutlinePlus className='mr-2'/>}
                        {item.note ? 'Edit Catatan' : 'Tambah Catatan'}
                    </button>
                    <button className='btn bg-red-500 hover:bg-red-600 font-medium' onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
