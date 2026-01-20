import { Loan } from "./loan.model";
import { User } from "./user.model";

export interface LoanApplication {
    loanApplicationId?: number;
    UserId?:string;
    user?: User;
    loanId?:number;
    loan?:Loan;
    submissionDate?: Date   ;
    institution: string;
    course: string
    tuitionFee: number;
    loanStatus?: number;
    address: string;
    file?: any

    // loanApplicationId?: number;
    // user?: {
    //     userId?:string;
    //     email?:string;
    //     password?:string;
    //     username?:string;
    //     mobileNumber?:string;
    //     userRole?:string;

    // };
    // loan?: {
    //     loanId?: number
    //     loanType?: string
    //     description?:string;
    //     interestRate?:number;
    //     maximumAmount?:number;
    //     repaymentTenure?:number;
    //     eligibility?:string;
    //     documentsRequired?:string;
    // };
    // submissionDate?: string;
    // institution?: string;
    // course?: string
    // tuitionFee?: number;
    // loanStatus?: any;
    // address?: string;
    // file?: any
}