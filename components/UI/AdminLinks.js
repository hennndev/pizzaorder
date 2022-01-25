import React from 'react'
import Link from 'next/link'

const AdminLinks = () => {
    return (
        <div className="flex items-center primary-color space-x-5 overflow-x-scroll whitespace-nowrap scrollbar-hide" data-aos='fade-up'>
            <Link href="/admin/products">
                <a className='text-white text-sm hover:text-blue-500 cursor-pointer hover:underline'>Semua Produk</a>
            </Link>
            <Link href="/admin/orders">
                <a className='text-white text-sm hover:text-blue-500 cursor-pointer hover:underline'>Pesananan</a>
            </Link>
            <Link href="/admin/users">
                <a className='text-white text-sm hover:text-blue-500 cursor-pointer hover:underline'>Pelanggan</a>
            </Link>
            <Link href="/admin/add-product">
                <a className='text-white text-sm hover:text-blue-500 cursor-pointer hover:underline'>Tambah Product</a>
            </Link>
        </div>
    )
}

export default AdminLinks
