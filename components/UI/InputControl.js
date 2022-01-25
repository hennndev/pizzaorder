import React from 'react'

const InputControl = ({formik, id, placeholder, type = 'text', select = null, textarea = null, children, formModal}) => {

    let inputType = <input 
                        id={id}
                        type={type} 
                        className={`${formik.errors[id] && 'border-red-400 focus:border-red-400'} form-input`}
                        placeholder={`Tulis ${placeholder} `}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}/>
    if(select) {
        inputType = <select
                        id={id}
                        className={`${formik.errors[id] && 'border-red-400 focus:border-red-400'} form-input`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}>
                            {children}
                        </select>
    }
    if(textarea) {
        inputType = <textarea 
                        id={id}
                        rows={6} 
                        className={`${formik.errors[id] && 'border-red-400 focus:border-red-400'} form-input`}
                        placeholder={`Tulis ${placeholder}`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}/>        
    }
    return (
        <div className={` ${formModal && 'mb-1' } input-control`}>
            <label htmlFor={id} className='form-label capitalize'>
                {id === 'passwordConfirmation' ? 'Password Konfirmasi' : id}
            </label>
            {inputType}
            {formik.touched[id] && formik.errors[id] && (
                <small className='text-error'>{formik.errors[id]}</small>
            )}
        </div>
    )
}

export default InputControl
