import React, { useEffect } from 'react';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

const Alert = ({isNewCart, setIsNewCart}) => {

    useEffect(() => {
        if(isNewCart) {
            const timer = setTimeout(() => {
                // After 3 seconds set the show value to false
                  setIsNewCart(null)
              }, 2000)
          
              return () => {
                clearTimeout(timer)
              }
        }
      }, [isNewCart]);

    if(!isNewCart) {
        return null;
    }

    return (
        <div className='fixed w-full top-0 right-0 left-0 flex justify-center z-50 px-7' data-aos='fade-down'>
            <div className='bg-white w-[500px] h-max mt-10 p-4 rounded-md flex items-center space-x-5'>
                {isNewCart.existItem ? (
                    <BsXCircleFill className='text-2xl text-red-600'/>
                ) : (
                    <BsCheckCircleFill className='text-2xl text-green-600'/>
                )}
                {isNewCart.existItem ? (
                    <p className='text-[#202020] font-medium'>Kamu sudah menambahkan produk ini</p>
                ) : (
                    <p className='text-[#202020] font-medium'>Sukses menambahkan produk ke keranjang kamu</p>
                )}
            </div>
        </div>
    )
};


export default Alert;
