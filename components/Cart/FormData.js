import React, { useState } from 'react'
import * as Yup from 'yup'
import Modal from '../UI/Modal'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { useFormik } from 'formik'
import SuccessModal from '../UI/SuccessModal'
import InputControl from '../UI/InputControl'

const FormData = ({isForm, cart, handleClose, handleClearCart, totalAll}) => {
    
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const user = Cookies.get('user')

    const dataOrders = cart.map(data => {
        return {
            product_id: data._id,
            count: data.count,
            nama: data.nama,
            harga: data.harga,
            gambarURL: data.gambar.gambarURL,
            kategori: data.kategori,
            status: data.status,
            note: data.note || null,
        }
    })
    const formik = useFormik({
        initialValues: {
            nama: '',
            alamat: '',
            telp: '',
            pembayaran: ''
        },
        onSubmit: (values) => {
            setIsLoading(true)
            fetch(`/api/orders/${JSON.parse(user).id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...values, 
                    dataOrders: dataOrders,
                    email: JSON.parse(user).email,
                    totalAll,
                    status: 'new'
                })
            }).then((res) => res.json()).then(() => {
                setIsLoading(false)
                handleClose()
                setIsSuccess(true)
            }).catch(() => {
                setIsLoading(false)
            })
        },
        validationSchema: Yup.object({
            nama: Yup.string().required('Nama kamu diperlukan!'),
            alamat: Yup.string().required('Alamat lengkap kamu diperlukan!'),
            telp: Yup.number().required('No telpon / no wa kamu diperlukan!'),
            pembayaran: Yup.string().required('Metode pembayaran diperlukan!')
        })
    })

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        handleClose()
        handleClearCart()
        Router.push('/orders')
    }

    return (
        <>
            {isSuccess && <SuccessModal title='Sukses order, silahkan ditunggu' handleClose={handleCloseSuccess}/>}
            {isForm && (
                <Modal>
                    <form onSubmit={formik.handleSubmit} className='relative'>
                        <h1 className='text-center text-xl primary-text font-semibold'>Form Data Kamu</h1>
                        {isLoading && <div className='form-loading'></div>}
                        <InputControl formik={formik} id="nama" placeholder="Nama Penerima" formModal/>
                        <InputControl formik={formik} id="telp" placeholder="No Telp/ No Wa Penerima" formModal/>
                        <InputControl formik={formik} id="alamat" placeholder="Alamat Lengkap Penerima" formModal textarea/>
                        <InputControl formik={formik} id="pembayaran" select formModal>
                            <option value="">Pilih Metode Pembayaran</option>
                            <option value="cod">COD</option>
                        </InputControl>
                        <div className="flex items-center space-x-3 mt-3">
                            <button className={`btn ${isLoading && 'btn-loading'} bg-gray-500 hover:bg-gray-600 w-full`} type='button' onClick={handleClose}>Cancel</button>
                            <button className={`btn ${isLoading && 'btn-loading'} w-full`} type='submit'>Order</button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default FormData
