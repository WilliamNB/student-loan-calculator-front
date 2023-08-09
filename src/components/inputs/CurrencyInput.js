import React from 'react';
import { useFormContext } from 'react-hook-form'

const CurrencyInput = ({placeholderText, symbol, required}) => {
  const { register } = useFormContext()

  return (
    <div className="input-group mb-3">
        <span className="input-group-text">{symbol}</span>
        <input type="number" className="form-control" aria-label="Input Salary" placeholder={placeholderText}
          {...register(placeholderText, {
            required: {
              value: required,
              message: 'required',
            }, 
            max: 99999999,
            min: 1
          })}
        />
    </div>
  )
}

export default CurrencyInput