import { Loan } from "./Loan";

export class Person{
    constructor(salary, startBalance, yearlySalaryIncrease, additionalPayments, loan){
        this.salary = salary;
        this.startBalance = startBalance;
        this.yearlySalaryIncrease = yearlySalaryIncrease / 100;
        this.additionalPayments = additionalPayments;
        this.loan = new Loan(loan);
        this.futureSalaries = new Map();
    }

    increaseSalary(){
        this.salary +=(this.salary * this.yearlySalaryIncrease)
    }
    
    setFutureSalaries(year, value){
        this.futureSalaries.set(year, value)
    }

    checkFutureSalaries(year){

    }

}