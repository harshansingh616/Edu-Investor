import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/models/auth-user.model';



@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {
  
  id:string;
  loanId:number;
  appliedLoans:LoanApplication[] =[];
  filteredLoans:LoanApplication[] =[];
  showPopup:boolean=false;
  searchTerm: string = '';

  constructor(private loanService: LoanService, private router:Router) { }

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.id  = localStorage.getItem('UserId');

    this.loanService.getAppliedLoans(this.id).subscribe(
      (x) => {
        this.appliedLoans = x;
        console.log(x);
        //this.filteredLoans = this.appliedLoans.filter(application => application.user.userId === this.id);
        
      },
    );
    console.log(this.id);
    console.log(this.appliedLoans);

  }

  searchLoan(): void {
     if (this.searchTerm) {
       this.appliedLoans = this.appliedLoans.filter(loan => loan.loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase()));
     } else {
       this.fetchLoans();
     }
  }

  // onDelete(loanId: number): void {
  //    if (confirm("Are you sure you want to delete this loan?")) {
  //      this.loanService.deleteLoanApplication(loanId).subscribe(() => {
  //        this.fetchLoans();
  //      });
  //   }
  // }

  onConfirm(id:number)
  {
    this.loanId=id;
    this.showPopup = true;
  }

  deleteLoan(){
    
    
    this.loanService.deleteLoanApplication(this.loanId).subscribe(() => {
      this.showPopup=false;
      this.fetchLoans();

    });
     (error) => {
      console.error('Error deleting loan:', error);
    };
    
  }
  closePopup() {
    this.showPopup = false;
    
  }
}
