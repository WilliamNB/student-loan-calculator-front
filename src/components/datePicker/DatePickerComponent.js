import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormContext } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({index}) => {
  const [startDate, setStartDate] = useState(new Date());
  const { register, setValue } = useFormContext();

  const generate = (date) =>{
    setStartDate(date);
    console.log(startDate.getUTCFullYear());
    setValue(("Date-"+index), date.getUTCFullYear());
  }

  return (
    <div className="input-group mb-3">
      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon className="fa-calendar" icon = {faCalendar} />
        </span>
        <DatePicker name="testDatePicker" selected={startDate} onChange={(date) => generate(date)} minDate={new Date()} showYearDropdown />
        <input value={startDate.getUTCFullYear()} type="hidden" {...register("Date-"+index
          )}/>
      </div>
    </div>

  );
};
export default DatePickerComponent;