import React from 'react'

const ResultTable = ({results}) => {

  return (
    <table className="table">
        <thead>
            <tr>
            <th scope="col">Year Number</th>
            <th scope="col">Predicted Salary</th>
            <th scope="col">Remaining Balance</th>
            <th scope="col">Salary Contributions</th>
            <th scope="col">Total paid this year</th>
            <th scope="col">Total Ammount Paid</th>
            </tr>
        </thead>
        <tbody>
            {
                results.map((currentElement => (
                    <tr key={currentElement.id}>
                    <th>{currentElement.yearNumber}</th>
                    <td>£{Math.round(currentElement.salary)}</td>
                    <td>£{Math.round(currentElement.remainingBalance)}</td>
                    <td>£{Math.round(currentElement.paidThisYearSalary)}</td>
                    <td>£{Math.round(currentElement.paidThisYearTotal)}</td>
                    <td>£{Math.round(currentElement.totalPaid)}</td>
                    </tr>
                )))
            }
        </tbody>
    </table>
  )
}

export default ResultTable