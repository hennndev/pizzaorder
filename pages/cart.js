import React, { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useData } from 'context/context'
import AddNote from '@/components/Cart/AddNote'
import Summary from '@/components/Cart/Summary'
import CartItem from '@/components/Cart/CartItem'
import Checkout from '@/components/Cart/Checkout'
import FormData from '@/components/Cart/FormData'
 
const Cart = () => {

    const [isNote, setIsNote] = useState(null)
    const [isForm, setIsForm] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)
    const { cart, handleDeleteCart, handleIncrement, handleDecrement, handleClearCart, handleAddNote } = useData()

    const totalOrders = cart.reduce((currVal, val) => currVal += val.count, 0 )
    const totalPrice = cart.reduce((currVal, val) => currVal += (val.count * val.harga), 0)
    const totalAll = totalPrice + (1/20 * totalPrice)

    const handleForm = () => {
        setIsForm(true)
        setIsCheckout(false)
    }

    return (
        <>
            <Head>
                <title>Cart | O`Pizza</title>
            </Head>
            <FormData 
                cart={cart} 
                isForm={isForm}
                handleClearCart={handleClearCart} 
                handleClose={() => setIsForm(false)} 
                totalAll={totalAll % 1 === 0 ? totalAll.toFixed(0) : totalAll.toFixed(2)}/>
            {isCheckout && (
                <Checkout 
                    cart={cart} 
                    handleCancel={() => setIsCheckout(false)} 
                    handleForm={handleForm}
                    totalOrders={totalOrders}
                    totalAll={totalAll % 1 === 0 ? totalAll.toFixed(0) : totalAll.toFixed(2)}/>
            )}
            {isNote && <AddNote 
                handleAddNote={(note) => handleAddNote({...isNote, note})} 
                setIsNote={setIsNote}
                isNote={isNote}/>}
            <section className='container py-10 text-white px-5 overflow-y-hidden'>
                {cart.length > 0 ? (
                    <>
                        <h1 className='text-center text-3xl font-medium mb-10' data-aos='fade-up'>Keranjangku</h1>
                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:space-x-5 lg:flex-row" data-aos='fade-up' data-aos-delay='300'>
                            <div className='flex-[0.75]'>
                                {cart.map(item => (
                                    <CartItem 
                                        key={item._id} 
                                        item={item} 
                                        setIsNote={setIsNote}
                                        handleIncrement={() => handleIncrement(item)}
                                        handleDecrement={() => handleDecrement(item)}
                                        handleDelete={() => handleDeleteCart(item)}/>
                                ))}
                            </div>
                            <Summary
                                totalOrders={totalOrders}
                                totalPrice={totalPrice}
                                totalAll={totalAll % 1 === 0 ? totalAll.toFixed(0) : totalAll.toFixed(2)}
                                setIsCheckout={setIsCheckout}/>
                        </div>
                    </>
                ) : (
                    <div className="flex-center flex-col space-y-5" data-aos='fade-up'>
                        <h1 className='text-center text-2xl font-semibold'>Keranjang Kamu Kosong :(</h1>
                        <button className="btn" onClick={() => Router.push('/menu')}>Lihat Menu</button>
                    </div>
                )}
            </section>
        </>
    )
}

export default Cart
