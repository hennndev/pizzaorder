import React from 'react';
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';

const ErrorPage = () => {

    const router = useRouter()

    return (
        <>
            <Head>
                <title>Error Page | O`Pizza</title>
            </Head>
            <div className='container px-5 flex-center flex-col space-y-5'>
            <div className="relative h-[300px] w-[300px]">
                <Image src='/images/error-page.png' layout='fill' objectFit='contain'/> 
            </div>
            <h1 className='text-2xl font-bold text-white text-center'>Oops, Halaman tidak ditemukan :(</h1>
            <button className="btn" onClick={() => router.push('/')}>Homepage</button>
        </div>
        </>
    )
};

export default ErrorPage
