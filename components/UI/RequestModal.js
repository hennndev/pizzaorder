import React from 'react'
import Modal from './Modal'
import { BsQuestionDiamond } from 'react-icons/bs'

const RequestModal = ({title, handleClose, handleConfirm, btnTitle, dlt, isLoading}) => {
    return (
       <Modal feedback>
            <BsQuestionDiamond className={`text-[120px] ${dlt ? 'text-red-500' : 'primary-text'}`}/>
            <h1 className='text-3xl mt-3 text-gray-600 text-center mb-3'>{title}</h1>
            <div className="flex space-x-3 mt-4">
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={handleClose}>Close</button>
                <button className={`btn ${dlt && 'bg-red-500 hover:bg-red-600'}`} onClick={handleConfirm}>{btnTitle}</button>
            </div>
            {isLoading && <div className="form-loading"></div>}       
        </Modal>
    )
}

export default RequestModal
