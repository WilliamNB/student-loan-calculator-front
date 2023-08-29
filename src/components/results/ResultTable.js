import React from 'react'

const ResultTable = ({results}) => {

    const resultsObject = results.map((result, i) => ({
        id: i,
        yearNumber: result.yearNumber,
        remainingBalance: result.remainingBalance,
        paidThisYearSalary: result.paidThisYearSalary,
        paidThisYearAdditional: result.paidThisYearAdditional,
        paidThisYearTotal: result.paidThisYearTotal,
        paidThisYearInterest: result.paidThisYearInterest,
        totalPaid: result.totalPaid,
        totalPaidInterest: result.paidInterestTotal,
        salary: result.salary
    }));

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
                resultsObject.map((currentElement => (
                    <tr key={currentElement.id}>
                    <th>{currentElement.yearNumber}</th>
                    <th>{currentElement["salary"]}</th>
                    <td>{currentElement["remainingBalance"]}</td>
                    <td>{currentElement["paidThisYearSalary"]}</td>
                    <td>{currentElement["paidThisYearTotal"]}</td>
                    <td>{currentElement["totalPaid"]}</td>
                    </tr>
                )))
            }
        </tbody>
    </table>
  )
}

export default ResultTable