import React from 'react'

const Modal = ({children, scroll, feedback}) => {
    return (
        <div className='bg-[rgba(0,0,0,0.6)] fixed w-full h-full top-0 right-0 left-0 bottom-0 flex-center px-5 z-10'>
            <div className={`${feedback && 'flex-center flex-col w-[450px]'} bg-white ${scroll && 'max-h-[550px] overflow-y-scroll'} rounded-md w-[400px] min-h-[200px] p-5 relative`} data-aos='zoom-in'>
                {children}
            </div>
        </div>
    )
}

export default Modal
