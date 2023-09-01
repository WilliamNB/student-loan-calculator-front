import React from 'react'
import { useFormContext } from 'react-hook-form'

const YearDropdown = () => {
  const { register } = useFormContext()
  const year = (new Date()).getFullYear();
  const years = Array.from(new Array(20),( val, index) => index - year);

  return (
    <div className="input-group mb-3">
    <select className="form-select" aria-label="Default select example"
      {...register("Graduation Year", {
        required: {
          value: true,
          message: 'required',
        },
      })}
    >
    <option value="" disabled selected hidden>Select graduation year</option>
     {
       years.map((year, index) => {
         return <option key={`year${index}`} value={Math.abs(year)}>{Math.abs(year)}</option>
       })
     }
    </select>
  </div>
  )
}

export default YearDropdown