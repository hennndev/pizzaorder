import React, { useState, useEffect } from 'react'
import Modal from '../UI/Modal'

const AddNote = ({handleAddNote, isNote, setIsNote}) => {
    
    const [value, setValue] = useState('')

    const handleConfirm = (e) => {
        e.preventDefault()
        setIsNote(false)
        handleAddNote(value.trim().replaceAll('/n' , ''))
        setValue('')
    }
    const handleClear = () => {
        handleAddNote(null)
        setValue('')
    }
    useEffect(() => {
        if(isNote?.note) {
            setValue(isNote?.note)
        }
    }, [isNote])

    return (
        <Modal>
            <h1 className='text-center font-semibold text-xl text-gray-800 mb-3'>
                Tambah Catatan
            </h1>
            <p className='text-gray-500 mb-3 text-sm'>
                *Kamu bisa request extra topping ( beef, chicken, salad, egg, mushroom, keju, sosis ) <br /> *Akan ada tambahan harga
            </p>
            <form onSubmit={handleConfirm}>
                <textarea 
                    rows="10" 
                    className='border border-gray-200 w-full shadow-md rounded outline-none text-gray-600 text-sm p-3' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}></textarea>

                <div className="flex-between space-x-3 mt-3">
                    <button className='btn bg-gray-600 hover:bg-gray-700 text-sm' onClick={() => setIsNote(null)} type='button'>Cancel</button>
                    <div className="flex items-center space-x-3">
                        <button className='bg-red-500 hover:bg-red-600 text-sm btn' onClick={handleClear} type='button'>Clear</button>
                        <button className='btn text-sm' type='submit'>Confirm</button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default AddNote
