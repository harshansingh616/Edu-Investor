import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { LoanApplication } from '../models/loan-application.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  public apiUrl="https://8080-eabfdcaffafbbafeaffcbfbacbacdcef.premiumproject.examly.io";

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http:HttpClient, private authserv:AuthService) { }

  getAllLoans():Observable<Loan[]>{
    //const headers=this.getAuthHeaders();
    return this.http.get<Loan[]>(`${this.apiUrl}/api/loan`, {headers:this.getAuthHeaders()});
  }

  deleteLoan(loanId:number):Observable<void>{
    const headers=this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/loan/${loanId}`, {headers});
  }

  getLoanById(id:number):Observable<Loan>{
    const headers=this.getAuthHeaders();
    return this.http.get<Loan>(`${this.apiUrl}/api/loan/${id}`, {headers});
  }

  addLoan(requestObject:Loan):Observable<Loan>{
    const headers=this.getAuthHeaders();
    return this.http.post<Loan>(`${this.apiUrl}/api/loan`, requestObject, {headers});
  }

  updateLoan(id:number, requestObject:Loan):Observable<Loan>{
    const headers=this.getAuthHeaders();
    return this.http.put<Loan>(`${this.apiUrl}/api/loan/${id}`, requestObject, {headers});
  }

  getAppliedLoans(userId:string):Observable<LoanApplication[]>{
    const headers=this.getAuthHeaders();
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/api/loanapplication/${userId}`,{headers});
  }

  deleteLoanApplication(loanId:number):Observable<void>{
    const headers=this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/loanapplication/${loanId}`,{headers});
  }

  addLoanApplication(data:LoanApplication):Observable<LoanApplication>{
    const headers=this.getAuthHeaders();
    console.log("loanservice");
    console.log(data);
    return this.http.post<LoanApplication>(`${this.apiUrl}/api/loanapplication`,data,{headers});
  }

  getAllloanApplications():Observable<LoanApplication[]>{
    const headers=this.getAuthHeaders();
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/api/loanapplication`,{headers});
  }

  updateLoanStatus(id:number, loanApplication:LoanApplication):Observable<LoanApplication>
  {
    const headers=this.getAuthHeaders();
    return this.http.put<LoanApplication>(`${this.apiUrl}/api/loanapplication/${id}`, loanApplication, {headers});
  }  
  showFile(loanapplication: LoanApplication) {
    const filePath = `/home/coder/project/workspace/angularapp/src/assets/${loanapplication.file}`;
    return this.http.get(filePath, { responseType: 'blob' }).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL); // This will open the file in a new tab
    });
  }
  
}
// /home/coder/project/workspace/angularapp/src/assets