import React from 'react'
import { useFormContext } from 'react-hook-form'
import { LoanType } from '../../javascript/LoanType'

const LoanDropdown = () => {
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
      <option value={LoanType.ONE}>One</option>
      <option value={LoanType.TWO}>Two</option>
      <option value={LoanType.FOUR}>Four</option>
      <option value={LoanType.FIVE}>Five</option>
    </select>
  </div>
  )
}

export default LoanDropdown