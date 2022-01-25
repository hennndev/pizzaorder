import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';

const Summary = ({totalOrders, totalPrice, totalAll, setIsCheckout}) => {

    const router = useRouter()
    const user = Cookies.get('user')
    const deliveryPrice = (1/20 * totalPrice)

    return (
        <div className='bg-[#202020] flex-[0.25] shadow-lg h-max p-3 min-h-[220px] rounded' data-aos='fade-up' data-aos-delay='500'>
            <h1 className='text-center text-2xl font-bold mb-10'>Summary</h1>
            <div className="flex-between mb-3">
                <h1>Total pesanan: </h1>
                <p className='text-white text-lg font-medium'>{totalOrders} pesanan</p>
            </div>
            <div className="flex-between mb-3">
                <h1>Total harga pesanan: </h1>
                <p className='text-white text-lg font-medium'>Rp {totalPrice}k</p>
            </div>
            <div className="flex-between mb-3">
                <h1>Biaya delivery: </h1>
                <p className='text-white text-lg font-medium'>
                    Rp {(deliveryPrice).toFixed(deliveryPrice % 1 === 0 ? 0 : 2)}k
                </p>
            </div>
            <div className="flex-between mb-3">
                <h1>Total Semua: </h1>
                <p className='primary-text text-2xl font-bold'>Rp {totalAll}k</p>
            </div>
            <button className={`${!user && 'bg-blue-500 hover:bg-blue-600'} btn w-full mt-3`} onClick={() => !user ? router.push('/signin') : setIsCheckout(true)}>
                {user ? 'Checkout Sekarang' : 'Login Dulu'}
            </button>
        </div>
    )
};

export default Summary;
