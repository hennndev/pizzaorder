import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { fetchAPI } from 'utils/utils'
import Products from '@/components/Products/Products'

const Menu = ({data}) => {

    const [cty, setCty] = useState('pizza')
    
    const router = useRouter()
    const handleCty = (val) => setCty(val)

    return (
        <>
            <Head>
                <title>Menu | O-Pizza</title>
            </Head>
            <div className='relative h-[670px] w-full'>
                <div className='bg-overlay flex-center flex-col text-white space-y-5'>
                    <h1 className='text-5xl tracking-wider font-bold' data-aos='fade-up'>Our Menu</h1>
                    <div className="flex items-center space-x-5" data-aos='fade-up' data-aos-delay='300'>
                        <p className='text-xl cursor-pointer font-semibold' onClick={() => router.push('/')}>Home</p>
                        <p className='text-xl cursor-pointer font-semibold'>Menu</p>
                    </div>
                </div>
                <Image src='/images/pizzabg.jpg' layout='fill' objectFit='cover'/>
            </div>
            <div className="container py-20 px-5 overflow-y-hidden">
                <div className="flex-center flex-col mb-10" data-aos='fade-up'>
                    <h1 className='text-center primary-text font-semibold text-4xl mb-2'>Our Menu</h1>
                    <p className="text-center text-gray-500 md:w-[500px]">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                </div>
                <div className='flex items-center space-x-5 justify-end mb-16' data-aos='fade-up' data-aos-delay='300'>
                    <p className={`cty ${cty === 'pizza' && 'border-none bg-primary text-white'}`} onClick={() => handleCty('pizza')}>Pizza</p>
                    <p className={`cty ${cty === 'burger' && 'border-none bg-primary text-white'}`} onClick={() => handleCty('burger')}>Burger</p>
                    <p className={`cty ${cty === 'drinks' && 'border-none bg-primary text-white'}`} onClick={() => handleCty('drinks')}>Drinks</p>
                </div>
                <Products data={data?.data?.filter(item => item.kategori === cty)}/>
            </div>
        </>
    )
}

export const getStaticProps = async() => {
    const data = await fetchAPI('products')

    return {
        props: {
            data
        },
        revalidate: 60
    }
}

export default Menu
