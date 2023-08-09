import React from 'react';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import CurrencyInput from '../inputs/CurrencyInput';

const FutureSalaryInputs = ({index}) => {
  console.log(index);
  return (
    <div>
        <DatePickerComponent index={index} />

        <CurrencyInput placeholderText={"Future Salary-"+index} symbol={"£"} required={false} />
    </div>
  )
}

export default FutureSalaryInputs