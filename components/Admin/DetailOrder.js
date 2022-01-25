import React from 'react'
import Image from 'next/image'
import Modal from '../UI/Modal'

const DetailOrder = ({isDetail, setIsDetail}) => {
    return (
        <Modal scroll>
            <h1 className='text-center primary-text text-xl font-medium mb-2'>Detail Order</h1>
            <div className="flex flex-col space-y-1">
                <h1>Nama: <span className='text-gray-600'>{isDetail.nama}</span></h1>
                <h1>Email: <span className='text-gray-600'>{isDetail.email}</span></h1>
                <h1>Alamat: <span className='text-gray-600'>{isDetail.alamat}</span></h1>
                <h1>No Telp: <span className='text-gray-600'>{isDetail.telp}</span></h1>
                <h1>Total: <span className='text-green-600 font-bold'>Rp {isDetail.totalAll}K</span></h1>
            </div>
            <h1 className='my-2'>Data Orders: </h1>
            <div className='ml-2 flex flex-col space-y-3'>
                {isDetail.dataOrders.map(item => (
                    <div className='flex flex-col space-y-2'>
                        <div className='flex items-center space-x-3'>
                            <div className="relative h-[80px] w-[80px]">
                                <Image src={item.gambarURL} layout='fill' objectFit='contain'/>
                            </div>
                            <div className='flex flex-col space-y-1 text-sm font-medium text-gray-600'>
                                <h1>{item.nama}</h1>
                                <h1>Jumlah {item.count}x</h1>
                                <h1>Rp {item.harga}K</h1>
                            </div>
                        </div>
                        <h1 className='text-sm text-gray-600'>
                            Note: <span className="underline">{item.note ? item.note : '-Empty-'}</span>
                        </h1>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-5">
                <button className="btn bg-gray-500 hover:bg-gray-600" onClick={() => setIsDetail(null)}>Close</button>
            </div>
        </Modal>
    )
}

export default DetailOrder
