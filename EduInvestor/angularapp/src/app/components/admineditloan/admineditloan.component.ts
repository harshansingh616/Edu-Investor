import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
  editLoan=NgForm;
  newLoan:Loan=
  {
    loanType:'',
    description:'',
    interestRate:0,
    maximumAmount:0,
    repaymentTenure:0,
    eligibility:'',
    documentsRequired:''
  };
  showPopup:boolean=false;

  loanId:number;
  constructor(private loanService:LoanService,private router:Router, private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.loanId= +this.activateRouter.snapshot.paramMap.get('loanId');
    this.getLoanById(this.loanId);
  }
  getLoanById(id:number)
  {
    this.loanService.getLoanById(id).subscribe((data)=>{
      console.log("loanId:"+id);
      this.newLoan=data
    });
    console.log("loanData: " +this.newLoan);
  }
  updateLoan()
  {
      const updatedLoan: Loan=this.newLoan;
      this.loanService.updateLoan(this.loanId, updatedLoan).subscribe((data) => {
        console.log('Updated successfully:', data);
        this.showPopup=true;

      }
    );
  }

  onSubmit(form) {
    if (form.valid) {
      this.updateLoan();
      this.showPopup=true;
    }
  }
  

  BackToViewLoan() {
    this.router.navigate(['admin/viewloan']);
  }

  closePopup()
  {
    this.showPopup = false;
    this.router.navigate(['admin/viewloan']);
  }
  
}
