import React, { useState } from 'react'
import cookie from 'cookie'
import Head from 'next/head'
import { sortData } from 'utils/utils'
import { useRouter } from 'next/router'
import { apiRoute } from 'config/config'
import Modal from '@/components/UI/Modal'
import OrderItem from '@/components/Orders/OrderItem'
import SuccessModal from '@/components/UI/SuccessModal'
import DetailOrder from '@/components/Orders/DetailOrder'

const Orders = ({data}) => {

    const [isSuccess, setIsSuccess] = useState(false)
    const [isMsgAdmin, setIsMsgAdmin] = useState(null)
    const [detailOrder, setDetailOrder] = useState(null)
    const router = useRouter()

    // TEST BUGGING (not yet)
    const deleteOrder = (orderId) => {
        fetch(`/api/orders/${orderId}`, {
            method: 'DELETE'
        }).then((res) => res.json()).then(() => {
            setIsSuccess(true)
        })
    }
    const handleCloseSuccess = () => {
        setIsSuccess(false)
        router.replace('/orders')
    }
    

    return (
        <>
            <Head>
                <title>My Orders | O`Pizza</title>
            </Head>
            {isMsgAdmin && (
                <Modal>
                    <h1 className='font-medium'>{isMsgAdmin}</h1>
                    <p className='mt-5'>From: <span className="underline">Admin O`Pizza</span></p>
                    <div className="flex justify-end mt-5">
                        <button className="btn bg-gray-500 hover:bg-gray-600" onClick={() => setIsMsgAdmin(null)}>Close</button>
                    </div>
                </Modal>
            )}
            {isSuccess && (
                <SuccessModal title='Order history berhasil dihapus' handleClose={handleCloseSuccess}/>
            )}
            {detailOrder && <DetailOrder detailOrder={detailOrder} setDetailOrder={setDetailOrder}/>}
            
            <section className="py-10 container px-5">
                {data.data.length > 0 && (
                    <>
                        <h1 className='text-center text-2xl primary-color font-bold mb-5' data-aos='fade-up'>Pesananku</h1>
                        <div className='grid grid-cols-cards gap-5' data-aos='fade-up' data-aos-delay='500'>
                            {sortData(data?.data, 'orderPada').map(order => (
                                <OrderItem 
                                    key={order._id} 
                                    order={order} 
                                    setDetailOrder={setDetailOrder} 
                                    deleteOrder={() => deleteOrder(order._id)} 
                                    setIsMsgAdmin={setIsMsgAdmin}/>
                            ))}
                        </div>
                    </>
                )}
                {data.data.length < 1 && (
                    <div className="flex-center flex-col space-y-5">
                        <h1 className='text-center text-2xl text-white'>Kamu belum memiliki pesanan :(</h1>
                        <button className="btn" onClick={() => router.push('/menu')}>Lihat Menu</button>
                    </div>
                )}
            </section>
        </>
    )
}

export const getServerSideProps = async(context) => {
    const { user } = cookie.parse(context.req.headers.cookie);
    const res = await fetch(`${apiRoute}/api/orders/${JSON.parse(user)?.id}`)
    const data = await res.json()

    return {
        props: { data }
    }
}

export default Orders;


