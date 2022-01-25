import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Head from 'next/head'
import Router from 'next/router'
import { useFormik } from 'formik'
import { useData } from 'context/context'
import ImageInput from '@/components/UI/ImageInput'
import AdminLinks from '@/components/UI/AdminLinks'
import InputControl from '@/components/UI/InputControl'
import RequestModal from '@/components/UI/RequestModal'
import SuccessModal from '@/components/UI/SuccessModal'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'

const UpdateProduct = () => {

    const [isUpload, setIsUpload] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { produkEdit, handleEditProduk } = useData()

    const formik = useFormik({
        initialValues: {
            nama: '',
            harga: '',
            kategori: '',
            status: '',
            deskripsi: '',
            gambar: null
        },
        onSubmit: () => {
            setIsUpload(true)
        },
        validationSchema: Yup.object({
            nama: Yup.string().required('Nama produk diperlukan!'),
            harga: Yup.number().required('Harga produk diperlukan!').min(1, 'Minimal harga produk > 1 rupiah'),
            kategori: Yup.string().required('Kategori produk diperlukan!'),
            status: Yup.string().required('Status produk diperlukan!'),
            deskripsi: Yup.string().required('Deskripsi produk diperlukan!'),
            gambar: Yup.mixed().required('Gambar produk diperlukan!')
                        .test('fileSize', 'Ukuran maksimal gambar < 1MB', value => typeof value === 'string' ? value.length > 0 : value?.size <= 1000000)
        })
    })

    const uploadData = async() => {
        setIsUpload(false)
        setIsLoading(true)
        
        const newProductEdit = {
            diunggahPada: produkEdit?.diunggahPada,
            nama: formik?.values.nama,
            harga: formik?.values.harga,
            kategori: formik?.values.kategori,
            status: formik?.values.status,
            deskripsi: formik?.values.deskripsi
        }

        if(typeof formik.values.gambar === 'string') {
            fetch(`/api/products/${produkEdit?._id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newProductEdit,
                    gambar: produkEdit.gambar,
                })
            }).then((res) => res.json()).then(() => {
                setIsLoading(false)
                formik.resetForm()
                setIsSuccess(true)
            })
        } else {
            const formDataImage = new FormData()
            formDataImage.append('file', formik.values.gambar)
            formDataImage.append('upload_preset', 'qzxb5iq7')

            fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
                method: 'POST',
                body: formDataImage
            }).then((res) => res.json()).then((res) => {
                fetch(`/api/products/${produkEdit?._id}`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...newProductEdit,
                        gambar: {
                            gambarURL: res.url,
                            gambarId: res.public_id
                        },
                        oldImageId: produkEdit?.gambar.gambarId
                    })
                }).then((res) => res.json()).then(() => {
                    setIsLoading(false)
                    formik.resetForm()
                    setIsSuccess(true)
                })
            })
        }  
    }
    const handleBack = () => {
        setIsSuccess(false)
        handleEditProduk(null)
    }
    useEffect(() => {
        if(produkEdit) {
            formik.setValues({
                nama: produkEdit?.nama,
                harga: produkEdit?.harga,
                kategori: produkEdit?.kategori,
                status: produkEdit?.status,
                deskripsi: produkEdit?.deskripsi,
                gambar: produkEdit?.gambar.gambarURL
            })
        } else {
            Router.push('/admin/products')
        }
    }, [produkEdit])

    return (
        <>
            <Head>
                <title>Admin Update Product | O`Pizza</title>
            </Head>
            {isUpload && (
                <RequestModal handleClose={() => setIsUpload(false)}
                    title='Kamu yakin akan melakukan edit produk ini ?'     
                    handleConfirm={uploadData}
                    btnTitle="Upload"/>
            )}       
            {isSuccess && <SuccessModal title="Sukses edit produk!" handleClose={handleBack}/>}     
                
            <section className="container py-10 px-5">
                <AdminLinks/>
                <div className="flex-center mt-5" data-aos='fade-up' data-aos-delay='300'>
                    <div className="w-[700px]">
                        <div className="flex items-center space-x-1 text-white hover:primary-text cursor-pointer" onClick={() => Router.push('/admin/products')}>
                            <HiOutlineArrowNarrowLeft className='text-2xl'/>
                            <p className='text-lg font-semibold'>kembali</p>
                        </div>
                    </div>
                </div>
                <div className="flex-center">
                    <form className='w-[700px] bg-white rounded-md min-h-[500px] mt-5 p-5 relative' onSubmit={formik.handleSubmit} data-aos='fade-up' data-aos-delay='500'>
                        {isLoading && <div className='form-loading'></div>}
                        <h1 className="text-2xl primary-text font-bold text-center mb-5">Update Product</h1>
                        <InputControl id='nama' formik={formik} placeholder="nama produk"/>
                        <InputControl id='harga' type='number' formik={formik} placeholder="harga produk"/>
                        <InputControl id='kategori' formik={formik} select>
                            <option value="">Pilih Produk Category</option>
                            <option value="pizza">Pizza</option>
                            <option value="burger">Burger</option>
                            <option value="drinks">Drinks</option>
                        </InputControl> 
                        <InputControl id='status' formik={formik} select>
                            <option value="">Pilih Produk Status</option>
                            <option value="tersedia">tersedia</option>
                            <option value="habis">habis</option>
                        </InputControl> 
                        <InputControl id='deskripsi' formik={formik} placeholder="Deskripsi produk" textarea/>

                        <ImageInput formik={formik} produkEdit={produkEdit}/>
                        <button className={`btn w-full ${isLoading && 'btn-loading'}`} type='submit'>
                            {!isLoading ? 'Edit Produk' : 'Loading...'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}


export default UpdateProduct
