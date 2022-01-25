import React, { useState } from 'react'
import * as Yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import ImageInput from '@/components/UI/ImageInput'
import AdminLinks from '@/components/UI/AdminLinks'
import InputControl from '@/components/UI/InputControl'
import RequestModal from '@/components/UI/RequestModal'
import SuccessModal from '@/components/UI/SuccessModal'

const AddProduct = () => {

    const [isUpload, setIsUpload] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            nama: '',
            harga: '',
            kategori: '',
            deskripsi: '',
            gambar: null
        },
        onSubmit: () => {
            setIsUpload(true)
        },
        validationSchema: Yup.object({
            nama: Yup.string().required('Nama produk dibutuhkan!'),
            harga: Yup.number().required('Harga produk dibutuhkan!').min(1, 'Minimal harga produk > 0 rupiah!'),
            kategori: Yup.string().required('Kategori produk dibutuhkan!'),
            deskripsi: Yup.string().required('Deskripsi produk dibutuhkan!'),
            gambar: Yup.mixed().required('Gambar produk dibutuhkan!')
                        .test('fileSize', 'Ukuran maksimal gambar < 1MB', value => value?.size <= 1000000)

        })
    })

    const uploadNewProduct = () => {
        setIsLoading(true)
        setIsUpload(false)
        const formDataImage = new FormData()
        formDataImage.append('file', formik?.values.gambar)
        formDataImage.append('upload_preset', 'qzxb5iq7')

        const newProduct = {
            nama: formik?.values.nama, 
            harga: formik?.values.harga,
            kategori: formik?.values.kategori,
            deskripsi: formik?.values.deskripsi
        }

        fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
            method: 'POST',
            body: formDataImage
        }).then((res) => res.json()).then((res) => {
            fetch('/api/products', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newProduct,
                    gambar: {
                        gambarURL: res.url,
                        gambarId: res.public_id
                    },
                })
            }).then((res) => res.json()).then(() => {
                setIsSuccess(true)
                setIsLoading(false)
                formik.resetForm()     
            })
        })
    }

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        router.push('/admin/products')
    }

    return (
        <>
            <Head>
                <title>Admin | O`Pizza</title>
            </Head>
            {isUpload && (
                <RequestModal handleClose={() => setIsUpload(false)}
                    title='Menambahkan produk baru ?'     
                    handleConfirm={uploadNewProduct}
                    btnTitle="Upload"/>
            )}       

            {isSuccess && (
                <SuccessModal title="Sukses menambahkan produk baru"
                handleClose={handleCloseSuccess}/>
            )}     

            <section className="container py-10 px-5">
                <AdminLinks/>
                <div className="flex-center">
                    <form className='w-[700px] bg-white rounded-md min-h-[500px] mt-5 p-5 relative' onSubmit={formik.handleSubmit} data-aos='fade-up' data-aos-delay='300'>
                        {isLoading && <div className='form-loading'></div>}
                        <h1 className="text-2xl primary-text font-bold text-center mb-5">Tambah Produk</h1>

                        <InputControl id='nama' formik={formik} placeholder="nama produk"/>
                        <InputControl id='harga' type='number' formik={formik} placeholder="harga produk"/>
                        <InputControl id='kategori' formik={formik} select>
                            <option value="">Pilih Kategori Produk</option>
                            <option value="pizza">Pizza</option>
                            <option value="burger">Burger</option>
                            <option value="drinks">Drinks</option>
                        </InputControl> 

                        {/* DESCRIPTION */}
                        <InputControl id='deskripsi' formik={formik} placeholder="Deskripsi produk" textarea/>
                        <ImageInput formik={formik}/>
                        <button className={`btn w-full ${isLoading && 'btn-loading'} `} type='submit'>
                            {!isLoading ? 'Tambah Product' : 'Loading...'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddProduct
