import React from 'react'
import Image from 'next/image'
import Header from './Header'

const Layout = ({children}) => {
    return (
        <div className='bg-[#191919] min-h-screen'>
            <div className="container px-4 py-2">
                <Header/>
            </div>
            <a href="https://wa.me/085848128298" target="_blank" rel="noopener noreferrer" className='fixed bottom-5 right-8 z-50'>
                <div className="div relative w-[60px] h-[60px] animate-bounce bg-white rounded-full">
                    <Image src='/images/whatsapp.png' layout='fill' objectFit='contain'/>
                </div>
            </a>
            {children}
        </div>
    )
}

export default Layout
