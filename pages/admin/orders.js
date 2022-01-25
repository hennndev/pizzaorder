import React, { useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import { sortData } from 'utils/utils' 
import { useRouter } from 'next/router'
import { FaEdit } from 'react-icons/fa'
import { apiRoute } from 'config/config'
import { MdDelete } from 'react-icons/md'
import { usePagination } from 'hooks/usePagination'
import Pagination from '@/components/UI/Pagination'
import AdminLinks from '@/components/UI/AdminLinks'
import EditOrder from '@/components/Admin/EditOrder'
import SearchInput from '@/components/UI/SearchInput'
import SuccessModal from '@/components/UI/SuccessModal'
import RequestModal from '@/components/UI/RequestModal'
import DetailOrder from '@/components/Admin/DetailOrder'

const AdminOrders = ({data}) => {
    
    const [isEdit, setIsEdit] = useState(false)
    const [isDetail, setIsDetail] = useState(null)
    const [isDelete, setIsDelete] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { page, setPage, dataSliced, firstSlice, secondSlice} = usePagination(5)

    const router = useRouter()

    const colors = {
        new: 'text-gray-500',
        preparing: 'text-blue-400',
        onTheWay: 'text-blue-500',
        awaitingPayment: 'text-orange-600' ,
        done: 'text-green-500'
    }

    const handleDeleteOrder = () => {
        setIsLoading(true)
        fetch(`/api/orders/${isDelete._id}`, {
            method: 'DELETE'
        }).then(res => res.json()).then(res => {
            setIsLoading(false)
            setIsDelete(null)
            setIsSuccess(true)
            setPage(1)
        }).catch(() => {
            setIsLoading(false)
        })
    }

    const filteredDataBySearch = data.data.filter(order => {
        return order.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(order.telp).includes(searchTerm) ||
                order._id.includes(searchTerm.toLowerCase()) ||
                moment(order.orderPada).format('LLL').toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.totalAll >= +searchTerm
    })

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        router.replace('/admin/orders')
    }

    return (
        <>
            <Head>
                <title>Admin Orders | O`Pizza</title>
            </Head>
            {isSuccess && (
                <SuccessModal title="Berhasil menghapus order history!" handleClose={handleCloseSuccess}/>
            )}
            {/* DELETE MODAL */}
            {isDelete && (
                <RequestModal handleClose={() => setIsDelete(false)}
                    title='Kamu yakin mau menghapus order history ini ?'     
                    handleConfirm={handleDeleteOrder}
                    btnTitle="Delete" dlt isLoading={isLoading}/>
            )}
            {/* EDIT MODAL */}
            {isEdit && <EditOrder data={isEdit} handleClose={() => setIsEdit(null)}/>}
            {/* DETAIL ORDER MODAL */}
            {isDetail && <DetailOrder isDetail={isDetail} setIsDetail={setIsDetail}/>}

            <section className='container py-10 px-5 overflow-y-hidden'>
                <AdminLinks/>
                <div className="my-5">
                    <SearchInput 
                        value={searchTerm}
                        setValue={setSearchTerm}
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Cari order berdasar kriteria apapun'/>
                </div>
                <div className='mt-5 w-full overflow-x-scroll scrollbar-hide' data-aos='fade-up' data-aos-delay='500'>
                    <table className='w-full bg-white rounded-md'>
                        <thead>
                            <tr className='bg-primary text-white'>
                                <th className="px-3 py-4 text-sm">
                                    No
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Order Id
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Tanggal Order
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Nama
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Detail Order
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Status
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Aksi
                                </th>   
                            </tr>
                        </thead>
                        <tbody>
                            {sortData(filteredDataBySearch, 'orderPada').slice(firstSlice, secondSlice).map((item, idx) => (
                                <tr className='text-gray-700 font-semibold whitespace-nowrap' key={item._id}>
                                    <td className="px-3 py-4 text-sm text-center">
                                        {(idx + 1) + (dataSliced * (page - 1))}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <p>{item._id}</p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <p>
                                            {moment(item.orderPada).format('LLL')}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <p className="text-green-700">
                                            {item.nama}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <button className='py-2 px-4 bg-blue-500 hover:bg-blue-600 transition duration-300 rounded text-white cursor-pointer' onClick={() => setIsDetail(item)}>Detail Orders</button>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <p className={`${colors[item.status]} ${item.status !== 'done' && 'animate-pulse'} uppercase`}>
                                            {item.status}
                                        </p>
                                    </td>
                                    <td className="px-10 py-4 text-center">
                                        <div className="flex-center space-x-3">
                                            <FaEdit 
                                                className={`${item.status === 'done' ?'text-gray-600 hover:text-gray-600 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600 cursor-pointer'} text-2xl`} 
                                                onClick={() => item.status !== 'done' && setIsEdit(item)}/>

                                            <MdDelete className={`${item.status !== 'done' ?'text-gray-600 hover:text-gray-600 cursor-not-allowed' : 'text-red-500 hover:text-red-600 cursor-pointer'} text-2xl `} 
                                            onClick={() => item.status === 'done' && setIsDelete(item)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredDataBySearch.length > dataSliced && (
                    <div className='mt-10 flex-center'>
                        <Pagination
                        page={page} 
                        setPage={setPage}
                        dataLength={(dataSliced * page) >= (filteredDataBySearch.length)}/>
                    </div>
                )}
            </section>
        </>
    )
}



export const getServerSideProps = async () => {
    const res = await fetch(`${apiRoute}/api/orders`)
    const data = await res.json()


    return {
        props: { data }
    }
}

export default AdminOrders
