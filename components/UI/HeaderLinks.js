import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai'

const HeaderLinks = ({user, cart, mobile, handleRoute, handleLogout}) => {
  return (
    <nav className={`${mobile ? 'flex md:hidden flex-col space-y-6 my-3 ml-2' : 'hidden md:flex items-center space-x-5'} text-white`}>
        <p className='header-link' onClick={() => handleRoute()}>HOME</p>
        <p className='header-link' onClick={() => handleRoute('menu')}>MENU</p>
        {user && JSON.parse(user)?.email.includes('admin') && (
            <p className='header-link' onClick={() => handleRoute('admin/products')}>ADMIN</p>
        )}
        {user && !JSON.parse(user)?.email.includes('admin') && (
            <p className='header-link' onClick={() => handleRoute('orders')}>ORDERS</p>
        )}    
        {!user && <p className='header-link' onClick={() => handleRoute('signin')}>SIGNIN</p>}
        {!mobile && (
            <div className='cursor-pointer relative' onClick={() => handleRoute('cart')}>
                <AiOutlineShoppingCart className='text-2xl text-white'/> 
                {cart.length > 0 && <div className='red-rounded'>{cart.length}</div>}
            </div>
        )}
        {user && mobile && (
            <div className="flex items-center space-x-2 mt-2">
            {user && <p className='text-sm font-medium'>Hai, {JSON.parse(user)?.username}</p>}
            <p> | </p>
            <p className='text-red-500 hover:text-red-600 cursor-pointer text-sm font-bold mt-[2px]' onClick={handleLogout}>LOGOUT</p>
            </div>
        )}
    </nav>
  )
};

export default HeaderLinks;
