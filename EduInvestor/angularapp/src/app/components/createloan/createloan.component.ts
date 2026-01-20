import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {
  @ViewChild('loanForm') loanForm:NgForm;
  showPopup:boolean=false;
  loan: Loan ={
    loanId: 0,
    loanType:'',
    description: '',
    interestRate: 0,
    maximumAmount: 0,
    repaymentTenure: 0,
    eligibility: '',
    documentsRequired:''

  };

  constructor(private service : LoanService,private router:Router ) { }

  ngOnInit(): void {
  }

  AddLoan()
  {
    if(this.loanForm.valid)
    {
      
      this.service.addLoan(this.loan).subscribe((data)=>{
        this.loanForm.reset();
        this.showPopup = true;
      });
    }
  }

  closePopup() 
  {
    this.showPopup = false;
    this.router.navigate(['admin/viewloan']);
  }

}
