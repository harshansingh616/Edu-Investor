import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
  searchText:string='';

  backup:Loan[]=[];
  loan:Loan;
  filteredLoans:Loan[]=[];
  showPopup:boolean=false;
  loanId:number;
  constructor(private service:LoanService, private route:Router) { }

  ngOnInit(): void {
    this.getAllLoans();
  }
  getAllLoans() {
    console.log("In ts create");
    this.service.getAllLoans().subscribe((data) => {
      console.log(data);
      this.filteredLoans = data;
      this.backup = data;
    })
  }

  editLoan(LoanId:number){

    console.log(LoanId);
   this.route.navigate([`/admineditloan/${LoanId}`]);

  }
  onConfirm(id:number)
  {
    this.loanId=id;
    console.log(id);
    this.showPopup = true;
  }

  deleteLoan(){
    console.log('Deleting loan with ID:', this.loanId);
    
    this.service.deleteLoan(this.loanId).subscribe((response) => {
      
      this.getAllLoans();
      this.closePopup();
    },
     (error) => {
      console.error('Error deleting loan:', error);
    });
    
  }
  closePopup() {
    this.showPopup = false;
    
  }

  filterloan(){
    this.filteredLoans=this.backup;
    if( this.searchText===''|| this.searchText===' '|| this.searchText===null ){
      return this.filteredLoans;
    }
    else{
      this.searchText=this.searchText;
      this.filteredLoans=this.filteredLoans.filter(x=> x.loanType.includes(this.searchText));
      return this.filteredLoans;
    }
  }

}
