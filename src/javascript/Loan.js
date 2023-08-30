import {LoanType} from './LoanType.js';

export class Loan{
    constructor(loanType){
        switch(loanType){
            case LoanType.ONE:
                this.loanType = loanType;
                this.interestRate = 0.05;
                this.paymentPercentage = 0.09;
                this.repayThreshold = 22015;
                this.writeOffYear = 25;
                break;
            case LoanType.TWO:
                this.loanType = loanType;
                this.interestRate = 0.08;
                this.paymentPercentage = 0.09;
                this.repayThreshold = 27297;
                this.writeOffYear = 30;
                break;
            case LoanType.FOUR:
                this.loanType = loanType;
                this.interestRate = 0.05;
                this.paymentPercentage = 0.09;
                this.repayThreshold = 27660;
                this.writeOffYear = 30;
                break;
            case LoanType.FIVE:
                this.loanType = loanType;
                this.interestRate = 0.1;
                this.paymentPercentage = 0.09;
                this.repayThreshold = 25000;
                this.writeOffYear = 40;
                break;
            default:
                console.log("Error in Loan switch case")
        }
    }


}