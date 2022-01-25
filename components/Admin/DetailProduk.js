import React from 'react';
import Modal from '../UI/Modal'
import Image from 'next/image'

const DetailProduk = ({isInfo, setIsInfo}) => {
    return (
        <Modal>
            <h1 className='text-center text-2xl font-bold primary-text mb-3'>Info Produk</h1>
            <div className="flex-center mb-3">
                <div className='relative w-[100px] h-[100px]'>
                    <Image src={isInfo.gambar.gambarURL} layout='fill' objectFit='contain'/>
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                <p>Nama: <span className="text-gray-700">{isInfo.nama}</span></p>
                <p>Harga: <span className="text-gray-700">Rp {isInfo.harga}k</span></p>
                <p>Deksripsi: <span className="text-gray-700">{isInfo.deskripsi}</span></p>
                <p>Status: <span className="text-gray-700">{isInfo.status}</span></p>
            </div>
            <div className="flex justify-end mt-5">
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={() => setIsInfo(null)}>Close</button>
            </div>
        </Modal>
    )
}

export default DetailProduk;
