import React from 'react'
import Image from 'next/image'

const About = () => {
    return (
        <div className='flex flex-col h-[900px] md:flex-row items-center md:h-[500px] md:space-x-10'>
            <div className='relative w-full h-[300px] md:h-[400px] md:flex-1 mb-10 md:mb-0' data-aos='fade-up'>
                <Image src='/images/restaurant.jpg' layout='fill' objectFit='cover'/>
            </div>
            <div className="md:flex-1 flex flex-col space-y-3 text-white" data-aos='fade-up' data-aos-delay='300'>
                <h1 className='text-2xl md:text-3xl tracking-wide font-bold uppercase leading-10'>Welcome To <span className='primary-text'>O`Pizza</span> RESTAURANT</h1>
                <p className='text-lg text-gray-400 leading-8'>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn't take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
            </div>
        </div>
    )
}

export default About
