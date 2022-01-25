import React, { useState } from 'react'
import Image from 'next/image'

const ImageInput = ({formik, produkEdit = null}) => {

    const [previewImage, setPreviewImage] = useState(null)

    const handleChangeImage = (e) => {
        const { files } = e.target
        formik.setValues({
            ...formik.values,
            gambar: files[0]
        })
        if(files[0]?.size < 1000000) {
            handlePreviewImage(files[0])
        } else {
            setPreviewImage(null)
        }
    }   

    const handlePreviewImage = (image) => {
        const imgReader = new FileReader()
        imgReader.readAsDataURL(image)
        imgReader.onloadend = () => {
            setPreviewImage(imgReader.result)
        }
    }

    return (
        <div className="input-control">
            <label htmlFor="gambar" className='form-label'>Gambar Produk</label>
            <input type="file" 
                id='gambar'
                accept='image/*'
                onChange={handleChangeImage}
                onBlur={formik.handleBlur}/>
            {formik.touched.gambar && formik.errors.gambar && <small className='text-error mt-1'>{formik.errors.gambar}</small>}
            {previewImage && (
                <div className='relative h-[100px] w-[100px] mt-3'>
                    <Image src={previewImage} layout='fill' objectFit='contain'/>
                </div>
            )}
            {produkEdit && !previewImage && (
                <div className='relative h-[100px] w-[100px] mt-3'>
                    <Image src={produkEdit?.gambar.gambarURL} layout='fill' objectFit='contain'/>
                </div>
            )}
        </div>
    )
}

export default ImageInput
