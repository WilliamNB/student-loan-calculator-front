import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import 'react-bootstrap';

import React, { useState} from "react";
import { FormProvider, useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import FutureSalary from './components/futureSalary/FutureSalary';
import CurrencyInput from './components/inputs/CurrencyInput';
import LoanDropdown from './components/dropdowns/LoanDropdown';
import ResultTable from './components/results/ResultTable';
import Repayements from './components/graphs/Repayements';
import ResultsOverview from './components/results/ResultsOverview';

import { Person } from './javascript/Person';
import { Result } from './javascript/Result';

function App() {

  const methods = useForm();
  const [apiResult, setApiResult] = useState();

  const onSubmit = methods.handleSubmit(data => {
    console.log(data);
    console.log(Object.values(data));
    //temp js solution to inital num from string inputs
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
      loanType : data["Loan Type"],
      additionalPayments : tempAdditionalPayments,
      salaryIncrease : tempSalaryIncrease,
      futureSalaries : Object.values(data).slice(5)
    } 

    console.log(inputs.futureSalaries);
    generateResults(inputs.salary, inputs.balance, inputs.loanType, inputs.additionalPayments, inputs.salaryIncrease, inputs.futureSalaries);
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
    const results = [];

    const person = new Person(salary, startBalance, salaryIncrease, additionalPayments, loanType);
    const loan = person.loan;

    if(futureSalaries != null){
        for(let i = 0; i < futureSalaries.length; i = i+2){
          person.setFutureSalaries(futureSalaries[i], parseInt(futureSalaries[i+1]));
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

            let result = new Result();
            if(balance < 0){
              result = new Result(year, 0, paidSalary + balance, paidAdditional, currentSalary, interestPaid); 
            }else{
              result = new Result(year, balance, paidSalary, paidAdditional, currentSalary, interestPaid);
            }
            result.updateTotalPaid(results[years - 1].totalPaid);
            result.updateTotalPaidInterest(results[years - 1].paidInterestTotal);

            results.push(result);

            if(balance > 0){
              balance += (interest);
            }
        }
    }


    results.forEach((i) => {
        console.log("Balance:", i.remainingBalance, "Years:", i.yearNumber, "Salary:", i.salary, "Payed this year total:", i.paidThisYearTotal, "Payed this year salary:", i.paidThisYearSalary, "Payed in total:", i.totalPaid, "Payed interest this year:", i.paidInterestTotal); 
    });

    console.log(results);
    console.log("It will take you", years ,"to repay your student loan");

    setApiResult(results)
  }

  const [icon, setIcon] = useState(true);

    
  return (
    <div className="App">
      <header className="App-header">
        <main className="margin-top">
        <section className='card'>
          <div className="row section-title">
            <div className='col'>Student Loan Calc</div>
            <FontAwesomeIcon className="col" data-bs-toggle="collapse" data-bs-target="#input-form" aria-expanded="false" onClick={() => setIcon(icon ? false : true)} icon={icon ? faCaretDown : faCaretUp} />
          </div>
          <div id="input-form">
            <FormProvider {...methods}>
              <form onSubmit={e => e.preventDefault()} noValidate>
              <div className="card card-body input-form">

                <CurrencyInput placeholderText={"Input Current Salary"} symbol={"£"} required={true} />

                <CurrencyInput placeholderText={"Input Loan Balance"}symbol={"£"} required={true} />

                <LoanDropdown />

                <div className='row additional-settings'>
                  <p className='col-9'>Additional Parameters</p>
                  <FontAwesomeIcon className="col fa-plus" data-bs-toggle="collapse" data-bs-target="#addition-settings" aria-expanded="false" onClick={() => setIcon(icon ? false : true)} icon={icon ? faCaretDown : faCaretUp} />
                </div>

                <div className="collapse" id="addition-settings">
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
          </div>
        </section>

        {apiResult != null &&
        <section className='card'>
          <div className="row section-title">
            <div className='col'>Results Table</div>
            <FontAwesomeIcon className="col" data-bs-toggle="collapse" data-bs-target="#results-table" aria-expanded="false" onClick={() => setIcon(icon ? false : true)} icon={icon ? faCaretDown : faCaretUp} />
          </div>
          <div className="card-body" id="results-table">
              <ResultTable results={apiResult}/>
          </div>
        </section>
        }

        {apiResult != null &&
        <section className='card'>
          <div className="row section-title">
            <div className='col'>Results Overview</div>
            <FontAwesomeIcon className="col" data-bs-toggle="collapse" data-bs-target="#results-overview" aria-expanded="false" onClick={() => setIcon(icon ? false : true)} icon={icon ? faCaretDown : faCaretUp} />
          </div>
          <div className="card-body" id="results-overview">
              <ResultsOverview results={apiResult} />
          </div>
        </section>
        }

        {apiResult != null &&   
        <section className='card margin-bottom'>
          <div className="row section-title">
            <div className='col'>Results Graph</div>
            <FontAwesomeIcon className="col" data-bs-toggle="collapse" data-bs-target="#results-graph" aria-expanded="false" onClick={() => setIcon(icon ? false : true)} icon={icon ? faCaretDown : faCaretUp} />
          </div>
          <div className="card-body margin-bottom" id="results-graph">
              <Repayements results={apiResult} />
          </div>
        </section>
        }

        </main>
      </header>
    </div>

  );
}

export default App;
