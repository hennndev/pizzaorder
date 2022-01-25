import React from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import moment from 'moment'
import { sortData } from 'utils/utils'
import { useRouter } from 'next/router'
import { apiRoute } from 'config/config'


const Notifications = ({data}) => {
    console.log(data)

    const router = useRouter()

    return (
        <>
           <Head>
               <title>Notifications | O`Pizza</title>
            </Head> 
            <section className='container py-10 px-5'>
                {data.length > 0 && <h1 className='text-center text-3xl text-white font-bold mb-5' data-aos='fade-up'>Notifikasi</h1>}
                <div className='flex flex-col space-y-3'>
                    {sortData(data, 'orderPada').map(notif => (
                        <div className='bg-white w-full p-3 rounded' key={notif._id} data-aos='fade-up' data-aos-delay='500'>
                            <h1 className='text-sm p-1 bg-blue-50 rounded w-max mb-1'>
                                Order Id = {notif._id}
                            </h1>
                            <h1 className='text-sm p-1 bg-blue-50 rounded w-max mb-3'>
                                Tanggal order = ( {moment(notif.orderPada).format('LLL')} )
                            </h1>
                            <h1 className='font-bold primary-text'>Pesan: {notif.admin_note}</h1>
                            <div className="flex-between mt-5">
                                <h1 className='text-sm underline text-blue-500 font-medium cursor-pointer' onClick={() => router.push('/orders')}>Lihat Order Saya</h1>
                                <h1 className='text-sm font-medium text-gray-600'>From Admin O`Pizza</h1>
                            </div>
                        </div>
                    ))}
                    {data.length < 1 && (
                        <div className="flex-center flex-col space-y-5">
                            <h1 className='text-2xl font-bold primary-text'>Tidak Ada Notifikasi</h1>
                            <button className="btn" onClick={() => router.push('/menu')}>Lihat Menu</button>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export const getServerSideProps = async(context) => {
    try {
        const { user } = cookie.parse(context.req.headers.cookie);
        const res = await fetch(`${apiRoute}/api/orders/${JSON.parse(user)?.id}`)
        const data = await res.json()

        const formattedData = data.data.filter(data => {
            if(data.admin_note && data.status !== 'done') {
                return data
            }
        })
    
        return {
            props: { data: formattedData }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }

    
}

export default Notifications
