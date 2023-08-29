import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import 'react-bootstrap';
//import api from './api/axiosConfig';
import FutureSalary from './components/futureSalary/FutureSalary';
import CurrencyInput from './components/inputs/CurrencyInput';
import LoanDropdown from './components/dropdowns/LoanDropdown';
import ResultTable from './components/results/ResultTable';
import React, { useState} from "react";
import { FormProvider, useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Repayements from './components/graphs/Repayements';

import { Person } from './javascript/Person';
import { Result } from './javascript/Result';
import { LoanType } from './javascript/LoanType';

function App() {

  const methods = useForm();

  const [apiResult, setApiResult] = useState(["test1"]);
  const [loading, setLoading] = useState(null);
  //const [error, setError] = useState(false);

  const onSubmit = methods.handleSubmit(data => {
    setLoading(true);
    console.log(data);
    console.log(Object.values(data));
    let tempAdditionalPayments;
    let tempSalaryIncrease;
    if(data["Additional Yearly Contributions"] === ""){
      tempAdditionalPayments = 0;
    }else{
      tempAdditionalPayments = parseInt(data["Additional Yearly Contributions"]);
    }
    if(data["Yearly Salary Increase"] === ""){
      tempSalaryIncrease = 0
    }else{
      tempSalaryIncrease = parseInt(data["Yearly Salary Increase"]);
    }
    const inputs = {
      salary : parseInt(data["Input Current Salary"]),
      balance : parseInt(data["Input Loan Balance"]),
      loan : parseInt(data["Input Loan Balance"]),
      additionalPayments : tempAdditionalPayments,
      salaryIncrease : tempSalaryIncrease,
      futureSalaries : Object.values(data).slice(5)
    } 

    console.log(inputs.futureSalaries);

    // if(inputs.salaryIncrease === ""){
    //   inputs.salaryIncrease = 0;
    // }
    // if(inputs.additionalPayments === ""){
    //   inputs.additionalPayments = 0;
    // }

    generateResults(inputs.salary, inputs.balance, LoanType.ONE, inputs.additionalPayments, inputs.salaryIncrease, inputs.futureSalaries);
    //generateResults(50000, 38000, LoanType.ONE, 2000, 5);
  })

  function calucalteInterestPaid(paidSalary, paidAdditional,interest ){
    let interestPaid;

    if((paidSalary + paidAdditional) > interest){
        interestPaid = interest;
    }else{
        interestPaid = interest - paidSalary + paidAdditional;
    }

    return interestPaid;
  
  }

  function generateResults(salary, startBalance, loanType, additionalPayments, salaryIncrease, futureSalaries){
    //add future salary back in as a parameter
    let results = [];

    let person = new Person(salary, startBalance, salaryIncrease, additionalPayments, loanType);
    let loan = person.loan;

    console.log(futureSalaries);

    if(futureSalaries != null){
        for(let i = 0; i < futureSalaries.length; i = i+2){
          person.setFutureSalaries(futureSalaries[i], futureSalaries[i+1]);
        }
    }

    let balance = person.startBalance;
    let years = 0;
    let year = new Date().getFullYear();

    while (balance > 0){
        if(years >= loan.writeOffYear){
            break;
        }else{
            if(years === 0){
              let initialResult = new Result(year, balance, 0, 0, person.salary, 0);
              results.push(initialResult);
            }
            person.increaseSalary();
            person.checkFutureSalaries(year); 
            
            let currentSalary = person.salary;
            let paidSalary = ((currentSalary - loan.repayThreshold) * loan.paymentPercentage);
            let paidAdditional = person.additionalPayments;
            let interest = balance * loan.interestRate;

            let interestPaid = calucalteInterestPaid(paidSalary, paidAdditional, interest);

            balance -= (paidSalary + paidAdditional);
            years ++;
            year ++;

            let result = new Result(year, balance, paidSalary, paidAdditional, currentSalary, interestPaid);
            // if (results !== null){
            //     result.updateTotalPaid(results[years - 2].totalPaid);
            //     result.updateTotalInterestPaid(results[years - 2].paidInterestTotal);
            // }
            results.push(result);

            balance += (interest);
            //console.log("Salary: " + person.salary + ", year: " + year);
        }
    }


    results.forEach((i) => {
        console.log("Balance: " + i.remainingBalance + ", Years: " + i.yearNumber + ", Salary: " + i.salary + ", Payed this year total: " + i.paidThisYearTotal + ", Payed this year salary: " + i.paidThisYearSalary + ", Payed in total: " + i.totalPaid  + ", Payed interest this year: " + i.paidInterestTotal); 
    });

    console.log(results);

    console.log("It will take you " + years + " to repay your student loan");

    setApiResult(results)

    // return new ResponseEntity<ArrayList<Result>>(results, HttpStatus.OK);
  }

  const [icon, setIcon] = useState(true);

  //if(loading) return <h1>test</h1>
    
  return (
    <div className="App">
      <header className="App-header">
        <main>
        <FormProvider {...methods}>
          <form onSubmit={e => e.preventDefault()} noValidate>
          <div className="card card-body">

            <CurrencyInput placeholderText={"Input Current Salary"} symbol={"£"} required={true} />

            <CurrencyInput placeholderText={"Input Loan Balance"}symbol={"£"} required={true} />

            <LoanDropdown />

            <div className='row additional-settings'>
              <p className='col-9'>Additional Parameters</p>
              <FontAwesomeIcon className="col fa-plus" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => setIcon(icon ? false : true)} icon={icon ? faCaretDown : faCaretUp} />
            </div>

            <div className="collapse" id="collapseExample">
              <div className="card card-body">

                <CurrencyInput placeholderText={"Additional Yearly Contributions"}symbol={"£"} required={false} />

                <CurrencyInput placeholderText={"Yearly Salary Increase"}symbol={"%"} required={false} />

                <FutureSalary />

              </div> 
            </div>

            <input className="btn btn-primary" type="submit" value="Submit" onClick={onSubmit}></input>

          </div>
          </form>
          </FormProvider>

          <section>
            <div className="card card-body">
              {apiResult != null &&
                <ResultTable results={apiResult}/>
              }
            </div>
          </section>

          <section>
            <div className="card card-body">
                <Repayements results={apiResult} />
            </div>
          </section>

          {loading ? <h1>loading</h1> : <h1></h1> }

        </main>
      </header>
    </div>

  );

  /* const {icon, setIcon} = useState(true);
  

  return (
    <div className="App">
      <header className="App-header">
        <main>
          <form>

            <div className="card card-body">

              <CurrencyInput placeholderText={"Input Current Salary"} symbol={"£"} />

              <CurrencyInput placeholderText={"Input Loan Balance"}symbol={"£"}  />

              <LoanType />

              <div className='row additional-settings'>
                <p className='col-9'>Additional Parameters</p>
                <FontAwesomeIcon className="col fa-plus" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => setIcon(icon ? false : true)} icon={icon ? faArrowDown : faArrowUp} />
              </div>

              <div className="collapse" id="collapseExample">
                <div className="card card-body">

                  <CurrencyInput placeholderText={"Yearly Salary Increase"}symbol={"%"}  />

                  <FutureSalary />

                </div> 
              </div>

              <input className="btn btn-primary" type="submit" value="Submit"></input>

            </div>

          </form>
        </main>
      </header>
    </div>
  ); */
}

export default App;
