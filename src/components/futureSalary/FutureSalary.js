import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FutureSalary.css';
import FutureSalaryInputs from './FutureSalaryInputs';

const FutureSalary = () => {

  const [componentCount, setComponentCount] = useState(0);

  const handleButtonClick = () => {
    setComponentCount(prevCount => prevCount + 1);
  };

  const additionalComponents = [];

  for (let i = 0; i < componentCount; i++) {
    additionalComponents.push(<FutureSalaryInputs index={i} key={i} />);
  }

  return (
    <div>
        <div className="row input-group mb-3 future-salary">
            <p className='col-9'> Add future Salary </p>
            <span className='col future-salary-button' onClick={handleButtonClick}>
            <FontAwesomeIcon className="fa-plus" icon = {faPlus} />
            </span>
        </div>
        {additionalComponents}
        <hr></hr>
    </div>
  )
}

export default FutureSalary