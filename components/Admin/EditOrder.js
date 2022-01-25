import React, { useState } from 'react';
import Modal from '../UI/Modal'
import Router from 'next/router'

const EditOrder = ({data, handleClose}) => {

    const [valStatus, setValStatus] = useState(data?.status || '');
    const [valNote, setValNote] = useState(data?.admin_note || '')

    const handleConfirm = () => {
        fetch('/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                valStatus,
                valNote,
                orderId: data._id
            })
        }).then(res => res.json()).then(res => {
            handleClose()
            Router.replace('/admin/orders')
        })
    }


    return (
        <Modal>
            <h1 className='mb-3 text-center text-xl primary-text font-medium'>Edit Order</h1>
            <div className="input-control mb-3">
                <label htmlFor="status" className='form-label mb-2'>Status</label>
                <select className='form-input' value={valStatus} onChange={(e) => setValStatus(e.target.value)}>
                    <option value="new">New</option>
                    <option value="preparing">Preparing</option>
                    <option value="onTheWay">On-The-Way</option>
                    <option value="awaitingPayment">Awaiting Payment</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div className="input-control">
                <label htmlFor="adminNote" className='form-label mb-2'>Admin Note</label>
                <textarea rows="6" placeholder='Tulis note untuk pelanggan' className='form-input' value={valNote} onChange={(e) => setValNote(e.target.value)}></textarea>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-4">
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={handleClose}>
                    Close
                </button>
                <button className='btn' onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </Modal>
    )
};

export default EditOrder

