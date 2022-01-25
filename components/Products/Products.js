import React, { useState } from 'react'
import Product from './Product'
import Alert from '../UI/Alert'

const Products = ({data}) => {
    const [isNewCart, setIsNewCart] = useState(null)
    
    return (
        <> 
            <Alert isNewCart={isNewCart} setIsNewCart={setIsNewCart}/>
            <div className='grid grid-cols-products-mobile md:grid-cols-products gap-x-5 gap-y-10' data-aos='fade-up' data-aos-delay='500'> 
                {data.length > 0 && data.map(data => (
                    <Product 
                        key={data._id} 
                        data={data}
                        handleAlert={(data) => setIsNewCart(data)}/>
                ))}
            </div>
            {data.length < 1 && (
                <div className='flex-center text-white text-center my-10' data-aos='fade-up'>
                    <h1 className='text-2xl font-semibold'>Oops, Maaf saat ini belum tersedia :( </h1>
                </div>
            )}
        </>
    )
}

export default Products
