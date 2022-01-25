import React from 'react'
import Image from 'next/image'
import Modal from '../UI/Modal'

const Checkout = ({cart, handleCancel, handleForm, totalOrders, totalAll}) => {
    return (
        <Modal scroll>
            <h1 className='text-center text-2xl primary-text font-semibold'>Checkout</h1>
            <h1>Total Pesanan: {totalOrders}</h1>
            <h1>My Orders: </h1>
            <div className='ml-2 flex flex-col my-3 space-y-3'>
                {cart.map(item => (
                    <div className='flex space-x-2' key={cart._id}>
                        <div className='relative w-[70px] h-[70px]'>
                            <Image src={item.gambar.gambarURL} layout='fill' objectFit='contain'/>
                        </div>
                        <div className='text-[15px] text-gray-700'>
                            <h1>{item.nama}</h1>
                            <p>{item.count}x</p>
                            <p>Rp {item.harga * item.count}K</p>
                        </div>
                    </div>
                ))}
            </div>
            <h1>Total Semua: <span className='font-bold text-xl primary-text'>Rp {totalAll}K</span>  (+biaya delivery)</h1>
            <div className="flex-center mt-3 space-x-3">
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={handleCancel}>Cancel</button>
                <button className='btn' onClick={handleForm}>Lanjut</button>
            </div>
        </Modal>
    )
}

export default Checkout
