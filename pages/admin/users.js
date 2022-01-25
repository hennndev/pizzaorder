import React, { useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import { sortData } from 'utils/utils'
import { apiRoute } from 'config/config'
import Pagination from '@/components/UI/Pagination'
import { usePagination } from 'hooks/usePagination'
import AdminLinks from '@/components/UI/AdminLinks'
import SearchInput from '@/components/UI/SearchInput'

const AdminUsers = ({data}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const { page, setPage, dataSliced, firstSlice, secondSlice} = usePagination(7)

    const filteredDataBySearch = data.data.filter(user => {
        return user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                moment(user.createdAt).format('LLL').toLowerCase().includes(searchTerm.toLowerCase()) 
    }) 

    return (
        <>
            <Head>
                <title>Admin Users | O`Pizza</title>
            </Head>
            <section className='container py-10 px-5 overflow-y-hidden'>
                <AdminLinks/>
                <div className="my-5">
                    <SearchInput 
                        value={searchTerm}
                        setValue={setSearchTerm}
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Cari user berdasar (nama, dan email)'/>
                </div>
                <div className='mt-5 w-full overflow-x-scroll scrollbar-hide' data-aos='fade-up' data-aos-delay='500'>
                    <table className='w-full bg-white rounded-md'>
                        <thead>
                            <tr className='bg-primary text-white whitespace-nowrap'>
                                <th className="px-5 py-4 text-sm">
                                    No
                                </th>   
                                <th className="px-5 py-4 text-sm">
                                    Dibuat Pada
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Nama
                                </th>   
                                <th className="px-3 py-4 text-sm">
                                    Email
                                </th>   
                            </tr>
                        </thead>
                        <tbody>
                            {sortData(filteredDataBySearch, 'createdAt').slice(firstSlice, secondSlice).map((user, idx) => (
                                <tr className='text-gray-700 font-semibold whitespace-nowrap' key={user._id}>
                                    <td className="px-3 py-4 text-sm text-center">
                                        {(idx + 1) + (dataSliced * (page - 1))}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-center">
                                        {moment(user.createdAt).format('LLL')}
                                    </td>
                                    <td className="px-5 py-4 text-sm flex-center">
                                        <p className="text-sm">
                                            {user.username}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-center">
                                        <p className="text-sm">
                                            {user.email}
                                        </p>
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

export const getServerSideProps = async() => {
    const res = await fetch(`${apiRoute}/api/users`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}

export default AdminUsers
