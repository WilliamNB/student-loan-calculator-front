import React from 'react'

const ResultsOverview = ({results}) => {
const finalResult = results[results.length - 1];
console.log(finalResult);

  return (
    <div class="row">
        <div class="col-sm-4 overview">Years to pay off loan: {finalResult.remainingBalance > 0 ? results.length+" (Written Off)" : results.length}</div>
        <div class="col-sm-4 overview">Total Paid: £{Math.round(finalResult.totalPaid)}</div>
        <div class="col-sm-4 overview">Total Interest Payed: £{Math.round(finalResult.paidInterestTotal)}</div>
    </div>
  )
}

export default ResultsOverview