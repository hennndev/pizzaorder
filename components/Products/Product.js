import React from 'react'
import Image from 'next/image'
import { useData } from 'context/context'

const Product = ({data, handleAlert}) => {

    const { handleAddCart, cart } = useData()

    const handleClick = (data) => {
        const existItem = cart.find(item => item._id === data._id)
        handleAlert(null)
        handleAddCart(data)
        setTimeout(() => {
            handleAlert({existItem})
        }, 300);
    }


    return (
        <div className='flex flex-col items-center space-y-3 w-full'>
            <div className='relative w-[150px] h-[150px] md:h-[200px] md:w-[200px]'>
                <Image src={data?.gambar?.gambarURL} layout='fill' objectFit='contain'/>
            </div>
            <div className='text-white text-center flex-between flex-col flex-grow'>
                <div>
                    <p className='text-2xl text-gray-50 mb-3'>{data?.nama}</p>
                    <p className='text-gray-400 leading-6 mb-2'>{data?.deskripsi}</p>
                    <p className='font-bold text-xl primary-text'>Rp {data?.harga}K</p>
                </div>
                <button className={`btn-outline btn mt-5 text-sm`} onClick={() => handleClick(data)}>
                    Masuk Keranjang
                </button>
            </div>
        </div>
    )
}

export default Product
