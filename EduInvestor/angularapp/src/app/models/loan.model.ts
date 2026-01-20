export interface Loan {
    loanId?: number;
    loanType:string;
    description:string;
    interestRate:number;
    maximumAmount:number;
    repaymentTenure:number;
    documentsRequired:string;
    eligibility:string;
}
