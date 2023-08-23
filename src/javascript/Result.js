export class Result{
    constructor(yearNumber, remainingBalance, paidSalary, paidAdditional, salary, interestPayed){
        this.yearNumber = yearNumber;
        this.remainingBalance = remainingBalance;
        this.paidThisYearSalary = paidSalary;
        this.paidThisYearAdditional = paidAdditional;
        this.paidThisYearTotal = paidSalary + paidAdditional;
        this.salary = salary;
        this.paidThisYearInterest = interestPayed;
        this.totalPaid = this.paidThisYearTotal;
        this.paidInterestTotal = interestPayed;
    }

    updateTotalPaid(lastYearsTotal){
        this.totalPaid += lastYearsTotal;
    }

    updateTotalPaidInterest(lastYearTotal){
        this.paidInterestTotal += lastYearTotal;
    }
}