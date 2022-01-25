import React from 'react';
import Image from 'next/image'
import Modal from '../UI/Modal'

const DetailOrder = ({detailOrder, setDetailOrder}) => {
    return (
        <Modal scroll>
            <h1 className='primary-text text-center text-xl font-semibold mb-3'>Detail Orders</h1>
            <div className="flex space-y-4 ml-4 flex-col">
                {detailOrder?.map(item => (
                    <div className='flex items-center space-x-3'>
                        <div className="relative h-[80px] w-[80px]">
                            <Image src={item.gambarURL} layout='fill' objectFit='contain'/>
                        </div>
                        <div className='flex flex-col space-y-1 text-[15px] font-medium text-gray-500'>
                            <h1>{item.nama}</h1>
                            <h1>{item.count}x</h1>
                            <h1>Rp {item.harga}K</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-5">
                <button className='btn bg-gray-600 hover:bg-gray-700' onClick={() => setDetailOrder(null)}>Close</button>
            </div>
        </Modal>
    )
};

export default DetailOrder;
