import 'styles/global.css'
import { useEffect } from 'react'
import Layout from '@/components/UI/Layout'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Provider } from 'context/context'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        AOS.init({
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 50,
        });
    });
    return (
        <Provider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default MyApp
