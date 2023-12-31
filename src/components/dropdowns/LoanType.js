import React from 'react'
import { useFormContext } from 'react-hook-form'

const LoanType = () => {
  const { register } = useFormContext()

  return (
    <div>
    <select className="form-select" aria-label="Default select example"
      {...register("Loan Type", {
        required: {
          value: true,
          message: 'required',
        },
      })}
    >
      <option value="" disabled selected hidden>Select Loan Type</option>
      <option value="ONE">One</option>
      <option value="TWO">Two</option>
      <option value="FOUR">Four</option>
      <option value="FIVE">Five</option>
    </select>
  </div>
  )
}

export default LoanType