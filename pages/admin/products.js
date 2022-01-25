import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { FaEdit } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { sortData } from 'utils/utils'
import { apiRoute } from 'config/config'
import { useData } from 'context/context'
import { MdDelete } from 'react-icons/md'
import { usePagination } from 'hooks/usePagination'
import Pagination from '@/components/UI/Pagination'
import AdminLinks from '@/components/UI/AdminLinks'
import SearchInput from '@/components/UI/SearchInput'
import SuccessModal from '@/components/UI/SuccessModal'
import RequestModal from '@/components/UI/RequestModal'
import DetailProduk from '@/components/Admin/DetailProduk'

const AdminProducts = ({data}) => {

    const [isInfo, setIsInfo] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { page, setPage, dataSliced, firstSlice, secondSlice} = usePagination(5)
    
    const router = useRouter()
    const { handleEditProduk } = useData()

    const editProduk = (data) => {
        handleEditProduk(data)
        router.push('/admin/update-product')
    }
    const deleteProduk = () => {
        setIsLoading(true)
        fetch(`/api/products/${isDelete._id}?gambarId=${isDelete.gambar.gambarId}`, {
            method: 'DELETE'
        }).then((res) => res.json()).then((res) => {
            setIsLoading(false)
            setIsDelete(false)
            setIsSuccess(true)
        })
    }

    const filteredDataBySearch = data.data.filter(produk => {
        return produk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                produk.harga >= searchTerm ||
                produk.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                produk.kategori.toLowerCase().includes(searchTerm.toLowerCase())
    }) 

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        router.replace('/admin/products')
    }


    return (
        <>
            <Head>
                <title>Admin Products | O`Pizza</title>
            </Head>
            {isSuccess && (
                <SuccessModal title="Berhasil menghapus produk!" handleClose={handleCloseSuccess}/>
            )}
            {isDelete && (
                <RequestModal handleClose={() => setIsDelete(false)}
                title='Kamu yakin mau melakukan hapus produk ini ?'     
                handleConfirm={deleteProduk}
                btnTitle="Delete" dlt isLoading={isLoading}/>
            )}
            {isInfo && <DetailProduk isInfo={isInfo} setIsInfo={setIsInfo}/>}
            
            <section className='container py-10 px-5'>
                <AdminLinks/>
                <div className="my-5">
                    <SearchInput 
                        value={searchTerm}
                        setValue={setSearchTerm}
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Cari produk berdasar (nama, harga, status)'/>
                </div>
                <div className='mt-5 w-full overflow-x-scroll scrollbar-hide' data-aos='fade-up' data-aos-delay='500'>
                    <table className='w-full bg-white rounded-md'>
                        <thead>
                            <tr className='bg-primary text-white'>
                                <th className="px-3 py-4 text-sm">
                                    No
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Gambar
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Nama
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Harga
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Info
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Aksi
                                </th>   
                            </tr>
                        </thead>
                        <tbody>
                            {sortData(filteredDataBySearch, 'diunggahPada').slice(firstSlice, secondSlice).map((item, idx) => (
                                <tr className='text-gray-700 font-semibold whitespace-nowrap' key={item._id}>
                                    <td className="px-3 py-4 text-sm text-center">
                                        {(idx + 1) + (dataSliced * (page - 1))}
                                    </td>
                                    <td className="px-10 py-4 text-sm flex-center">
                                        <div className='relative h-[60px] w-[60px]'>
                                            <Image src={item.gambar.gambarURL} layout='fill' objectFit='contain'/>
                                        </div>
                                    </td>
                                    <td className="px-10 py-4 text-sm text-center w-[200px]">
                                        <p className="text-sm whitespace-pre-wrap">
                                            {item.nama}
                                        </p>
                                    </td>
                                    <td className="px-10 py-4 text-sm text-center">
                                        <p className="text-sm text-green-700">
                                            Rp {item.harga}K
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <button className='btn' onClick={() => setIsInfo(item)}>Detail</button>
                                    </td>
                                    <td className="px-10 py-4 text-sm text-center">
                                        <div className="flex-center space-x-3">
                                            <FaEdit className='text-2xl text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => editProduk(item)}/>
                                            <MdDelete className='text-2xl text-red-500 hover:text-red-600 cursor-pointer' onClick={() => setIsDelete(item)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-10 flex-center'>
                    {filteredDataBySearch.length > dataSliced && (
                        <Pagination
                        page={page} 
                        setPage={setPage}
                        dataLength={(dataSliced * page) >= (filteredDataBySearch.length)}/>
                    )}
                </div>
            </section>
        </>
    )
}

export const getServerSideProps = async() => {
    const res = await fetch(`${apiRoute}/api/products`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}

export default AdminProducts
