import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const HeroItem = ({hero}) => {

    const router = useRouter()
    return (
        <div className='w-full h-[750px] relative'>
            <div className="bg-overlay flex items-center pt-56 flex-col text-white text-center px-3">
                <h1 className='text-3xl md:text-5xl font-bold' data-aos='fade-up'>{hero.title}</h1>
                <p className='text-lg md:text-xl font-semibold mt-2 tracking-wide' data-aos='fade-up' data-aos-delay='300'>{hero.desc}</p>
                <button className='btn-outline text-lg font-medium btn mt-5' onClick={() => router.push('/menu')} data-aos='fade-up' data-aos-delay='500'>View Menu</button>
            </div>
            <div className='relative w-full h-full'>
                <Image src={hero.bgImage} layout='fill' objectFit='cover'/>
            </div>
        </div>
    )
}

export default HeroItem
