import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {
  searchText:string='';
  loanApplication:LoanApplication[];
  eduloan:Loan[]=[];
  selectedLoan: Loan;
  filteredLoans:Loan[]=[];
  id:number;


  constructor(private route:Router,private service:LoanService) { }

  ngOnInit(): void {
    this.getAllLoans();
    this.getAllLoanByUser();
  }
  
  public getAllLoans() {
    this.service.getAllLoans().subscribe(x => {
      this.eduloan = x;
      this.filteredLoans=x;
      console.log(x);
    })
  }
  getAllLoanByUser()
  {
    
    this.service.getAppliedLoans(localStorage.getItem('UserId')).subscribe((data)=>
    {
      console.log(data);
      this.loanApplication=data;
    })
  }

  applyLoan(LoanId:number){
    this.route.navigate([`/loanform/${LoanId}`]);
  }

  filterloan(){
    this.eduloan=this.filteredLoans;
    if( this.searchText===''|| this.searchText===' '|| this.searchText===null ){
      return this.eduloan;
    }
    else{
      this.searchText=this.searchText;
      this.eduloan=this.eduloan.filter(x=> x.loanType.includes(this.searchText));
      return this.eduloan;
    }
  }

  disableApplyButton(id:number)
  {
    if(!this.loanApplication)
    {
      return false;
    }
    return this.loanApplication.some(a=>a.loanId===id);
  }

}
