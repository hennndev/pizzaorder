import Head from 'next/head'
import { fetchAPI } from 'utils/utils'
import Hero from '@/components/UI/Hero'
import About from '@/components/UI/About'
import Products from '@/components/Products/Products'

export default function Home({data}) {
    return (
        <>
            <Head>
                <title>Home | O`Pizza</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className='overflow-y-hidden'>
                <Hero/>
                <div className="container my-10 px-5">
                    <About/>    
                    <div className='mt-5'>
                        <div className="flex-center">
                            <h1 className='text-center text-2xl md:text-3xl text-white tracking-wide font-bold mb-10 border-b-2 border-[#F47340] pb-3 w-max' data-aos='fade-up' data-aos-delay='300'>HOT <span className='primary-text'>PIZZA</span> MEALS</h1>
                        </div>
                        <Products data={data.data}/>
                    </div>   
                </div>
            </section>
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
