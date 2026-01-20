import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Router } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
declare var Swal: any;

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {
  
  appliedLoans: LoanApplication[] = [];
  backup: LoanApplication[]=[];
  searchText:string='';
  count: number = 0;
  decodedContent: string = ''; 
  constructor(private service: LoanService,private route:Router,private http :HttpClientModule) { }

  ngOnInit(): void {
    this.getAllAppliedLoans();
  }
  showCustomData(la: LoanApplication) 
  {
    this.service.showFile(la);
    // if (la.file) {
    //   // Decode the Base64 string
    //   const decodedString = atob(la.file);
    //   this.decodedContent = decodedString; 
    //   // Display the decoded content
    //   console.log(decodedString); // You can replace this with any display logic you need
    // } else {
    //   console.log('No file data available');
    // }
  }
  
  getAllAppliedLoans() {
    this.service.getAllloanApplications().subscribe((data) => {
      this.appliedLoans = data;
      this.backup=data;
      console.log(this.appliedLoans,"asdfgh")
    });
  }
  changeStatus(status: string, la: LoanApplication) {
    console.log(status);
    // console.log(loanApplicationId);
    console.log(la.loanStatus);
    if(status==='Approve')
    {
      la.loanStatus = 1;
      console.log(la.loanStatus);
    }
    if(status==='Reject')
    {
      la.loanStatus = 2;
      console.log(la.loanStatus);
    }
    this.service.updateLoanStatus(la.loanApplicationId, la).subscribe(x => {
      this.getAllAppliedLoans();
    });
  }
  filterloan(){
    this.appliedLoans=this.backup;
    if( this.searchText===''|| this.searchText===' '|| this.searchText===null ){
      return this.appliedLoans;
    }
    else{
      this.searchText=this.searchText;
      this.appliedLoans=this.appliedLoans.filter(x=> x.loan.loanType.includes(this.searchText));
      return this.appliedLoans;
    }
  }
}
