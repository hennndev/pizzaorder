import React, { useState } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import InputControl from '@/components/UI/InputControl'

const Signin = () => {

    const router = useRouter()
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const req = await fetch('/api/auth/signin', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                const res = await req.json()
                if(res.error) {
                    throw new Error(res.error)
                } else {
                    Cookies.set('user', JSON.stringify(res.user))
                    setIsLoading(false)
                    setIsError(null)
                    router.replace('/')
                }
            } catch (error) {
                setIsError(error.message)
                setIsLoading(false)
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email diperlukan!').email('Email tidak valid!'),
            password: Yup.string().required('Password diperlukan!').min(8, 'Minimal panjang password 8 karakter atau lebih!')
        })
    })
    

    return (
        <>
            <Head>
                <title>Signin | O`Pizza</title>
            </Head>
            <div className='flex-center px-5'>
                <form className='bg-white mt-10 p-5 rounded shadow-md w-[400px] min-h-[400px] flex justify-between flex-col relative' data-aos='fade-up' onSubmit={formik.handleSubmit}>
                    {isLoading && <div className='form-loading'></div>}
                    <div>
                        <h1 className="text-center primary-text font-bold text-2xl mb-5">Signin</h1>
                        <InputControl formik={formik} type='email' id='email' placeholder="Email Kamu"/>
                        <InputControl formik={formik} type='password' id='password' placeholder="Password Kamu"/>
                    </div>
                    <button className={` ${isLoading && 'btn-loading'} btn`} type='submit'>
                        {isLoading ? 'Loading...' : 'Signin'}
                    </button>
                    {isError && <p className='text-error mb-1 font-semibold'>{isError}</p>}
                    <p className='text-center text-[15px] text-gray-600 font-semibold mt-5'>Don't have an account ? <span className='primary-text cursor-pointer hover:underline' onClick={() => router.push('/signup')}>Signup</span></p>
                </form>
            </div>
        </>
    )
}


export default Signin
