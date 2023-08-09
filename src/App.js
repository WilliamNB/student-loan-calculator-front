import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import 'react-bootstrap';
import api from './api/axiosConfig';
import FutureSalary from './components/futureSalary/FutureSalary';
import CurrencyInput from './components/inputs/CurrencyInput';
import LoanType from './components/dropdowns/LoanType';
import ResultTable from './components/results/ResultTable';
import React, { useState} from "react";
import { FormProvider, useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Repayements from './components/graphs/Repayements';

function App() {

  const methods = useForm();

  const [apiResult, setApiResult] = useState(["test1"]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  const onSubmit = methods.handleSubmit(data => {
    setLoading(true);
    console.log(data);
    generateURL(data);
  })

  const generateURL = (data) =>{
    let url = "/api/v1";

    let counter = 0;

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if(value != ''){
          if(counter > 5){
            console.log(`${key}: ${value}`);
            url += `-${value}`;
          }else{
            console.log(`${key}: ${value}`);
            url += `/${value}`;
          }
        }else{
          console.log(`${key}: ${value}`);
          url += `/0`;
        }
        counter++
      }
    }
    console.log(url);
    callApi(url);
  }

  const callApi = async (url) => {
    try{
      console.log("url:" + url)
      const response = await api.get(url);
      console.log(response)
      response.data.forEach((currentElement) => { console.log(currentElement)})
      setApiResult(response.data);
      setLoading(null);
    }catch(error){
      console.log(error);
      setError(error)
    }
  }

  const [icon, setIcon] = useState(true);

  if(loading) return <h1>test</h1>
    
  return (
    <div className="App">
      <header className="App-header">
        <main>
        <FormProvider {...methods}>
          <form onSubmit={e => e.preventDefault()} noValidate>
          <div className="card card-body">

            <CurrencyInput placeholderText={"Input Current Salary"} symbol={"£"} required={true} />

            <CurrencyInput placeholderText={"Input Loan Balance"}symbol={"£"} required={true} />

            <LoanType />

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
                <Repayements results={apiResult}/>
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
