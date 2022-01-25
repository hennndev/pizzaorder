import React from 'react'
import Modal from './Modal'
import { HiCheckCircle } from 'react-icons/hi'

const SuccessModal = ({handleClose, title, handleConfirm, subtitle = '', btnSubtitle}) => {
    return (
        <Modal feedback>
                <HiCheckCircle className='text-[120px] text-green-500'/>
                <p className='text-3xl mt-3 text-gray-600 text-center'>{title}</p>
                {subtitle && <p className='text-gray-600'>{subtitle}</p>}
                <div className="flex space-x-3">
                    <button className='bg-gray-600 hover:bg-gray-700 py-2 px-4 text-white rounded mt-3' onClick={handleClose}>Close</button>
                    {subtitle && <button className='btn bg-blue-500 hover:bg-blue-600 mt-3' onClick={handleConfirm}>{btnSubtitle}</button>}
                </div>
        </Modal>
    )
}

export default SuccessModal
