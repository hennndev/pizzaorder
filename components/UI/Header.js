import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import HeaderLinks from './HeaderLinks'
import { useRouter } from 'next/router'
import { useData } from 'context/context'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'

const Header = () => {

    const [isNotif, setIsNotif] = useState([])
    const [openMenu, setOpenMenu] = useState(false)
    
    const router = useRouter()
    const { cart } = useData()
    const user = Cookies.get('user')

    const handleRoute = (route = '') => {
        setOpenMenu(false)
        router.push(`/${route}`)
    }

    const handleLogout = () => {
        setOpenMenu(false)
        Cookies.remove('user')
        router.replace('/')
    }

    useEffect(() => {
        if(user) {
            fetch(`/api/orders/${JSON.parse(user)?.id}`).then(res => res.json()).then(res => {
                const formattedData = res.data.filter(data => {
                   if(data.status !== 'done')  return data?.admin_note
                })
                setIsNotif(formattedData)
            })
        }
    }, [user]);

    
    
    return (
        <header className='flex flex-col'>
            <div className='flex-between text-white py-2'>
                <div className="flex items-center space-x-1 -mt-1">
                    <div className="relative h-10 w-10">
                        <Image src='/images/pizza-logo.png' layout='fill' objectFit='contain'/>
                    </div>
                    <h1 className='text-2xl font-bold primary-text cursor-pointer' onClick={() => handleRoute('/')}>O`Pizza</h1>
                </div>
                <HeaderLinks 
                    user={user} 
                    cart={cart} 
                    handleRoute={handleRoute} 
                    handleLogout={handleLogout}/>

                <div className="flex md:hidden items-center space-x-3">
                    <div className='cursor-pointer relative' onClick={() => handleRoute('notifications')}>
                        {user && !JSON.parse(user)?.email.includes('admin') && (
                            <>
                                <MdOutlineNotificationsNone className='text-2xl text-white'/> 
                                {isNotif.length > 0 && <div className='red-rounded'>{isNotif.length}</div>}
                            </>
                        )}
                    </div>
                    <div className='cursor-pointer relative' onClick={() => handleRoute('cart')}>
                        <AiOutlineShoppingCart className='text-2xl text-white'/> 
                        {cart.length > 0 && <div className='red-rounded'>{cart.length}</div>}
                    </div>
                    <AiOutlineMenu className={`text-3xl cursor-pointer ${openMenu && 'primary-text outline'} hover:primary-text hover:outline outline-white p-1 rounded-md`} onClick={() => setOpenMenu(!openMenu)}/>
                </div>
                {user && (
                    <div className='hidden md:flex items-center space-x-5'>
                        {!JSON.parse(user)?.email.includes('admin') && (
                            <div className='cursor-pointer relative' onClick={() => handleRoute('notifications')}>
                                <MdOutlineNotificationsNone className='text-2xl text-white'/> 
                                {isNotif.length > 0 && <div className='red-rounded'>{isNotif.length}</div>}
                            </div>
                        )}
                        <p className='text-sm font-medium'>Hai, {JSON.parse(user)?.username}</p>
                        <p className='text-red-500 hover:text-red-600 cursor-pointer text-sm font-bold' onClick={handleLogout}>LOGOUT</p>
                    </div>
                )}
            </div>
            {openMenu && (
                <HeaderLinks
                    mobile
                    user={user}
                    cart={cart}
                    handleRoute={handleRoute}
                    handleLogout={handleLogout}/>
            )}
        </header>
    )
}

export default Header
