import React, { useState } from 'react'
import * as Yup from 'yup'
import Head from 'next/head'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import InputControl from '@/components/UI/InputControl'
import SuccessModal from '@/components/UI/SuccessModal'

const Signup = () => {

    const router = useRouter()
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            const user = {
                username: values.username,
                email: values.email,
                password: values.password
            }
            try {
                const req = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                const res = await req.json()
                if(res) {
                    setIsLoading(false)
                    setIsError(null)
                    setIsSuccess(true)
                }
            } catch (error) {
                setIsError('Email sudah dipakai')
                setIsLoading(false)
            }
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username diperlukan!'),
            email: Yup.string().required('Email diperlukan!').email('Email tidak valid!'),
            password: Yup.string().required('Password diperlukan!').min(8, 'Minimal panjang password 8 karakter atau lebih!'),
            passwordConfirmation: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Password konfirmasi tidak cocok!').required('Password konfirmasi diperlukan!')
        })
    })

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        formik.resetForm()
    }

    return (
        <>
            <Head>
                <title>Signup | O`Pizza</title>
            </Head>
            {isSuccess && (
                <SuccessModal 
                    handleClose={handleCloseSuccess} 
                    handleConfirm={() => router.push('/signin')}
                    title='Success Create Account' 
                    subtitle='Now you can login'
                    btnSubtitle='Login'/>
            )}
            <div className='flex-center px-5'>
                <form className='bg-white my-10 p-5 rounded shadow-md w-[400px] min-h-[400px] flex justify-between flex-col relative' data-aos='fade-up' onSubmit={formik.handleSubmit}>
                    {isLoading && <div className='form-loading'></div>}
                    <div>
                        <h1 className="text-center primary-text font-bold text-2xl mb-5">Signup</h1>
                        <InputControl formik={formik} id="username" placeholder="Username Kamu"/>
                        <InputControl formik={formik} type='email' id="email" placeholder="Email Kamu"/>
                        <InputControl formik={formik} type='password' id="password" placeholder="Password"/>
                        <InputControl formik={formik} type='password' id="passwordConfirmation" placeholder="Password Konfirmasi"/>
                       
                    </div>
                    <button className={`${isLoading && 'btn-loading'} btn`} type='submit'>
                        {isLoading ? 'Loading...' : 'Signup'}
                    </button>
                    {isError && <p className='text-error mb-1 font-semibold'>{isError}</p>}
                    <p className='text-center text-[15px] text-gray-600 font-semibold mt-5'>
                        Already have an account ? {' '}
                        <span className='primary-text cursor-pointer hover:underline' onClick={() => router.push('/signin')}>Signin</span>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Signup
