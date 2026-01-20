import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { LoanService } from 'src/app/services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  loanForm: FormGroup;
  newLoanApplication: LoanApplication = {
    loanApplicationId: 0,
    UserId: '',
    loanId: 0,
    submissionDate: new Date(),
    institution: '',
    course: '',
    tuitionFee: 0,
    loanStatus: 0,
    address: '',
    file: ''
  };
  showPopup: boolean = false;
  formSubmitted = false;
  loanId: number;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loanId = +this.activateRouter.snapshot.paramMap.get('loanId');
    this.newLoanApplication.loanId = this.loanId;

    this.loanForm = this.fb.group({
      institution: [this.newLoanApplication.institution, Validators.required],
      course: [this.newLoanApplication.course, Validators.required],
      tuitionFee: [this.newLoanApplication.tuitionFee, Validators.required],
      address: [this.newLoanApplication.address, Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loanForm.valid) {
      this.newLoanApplication = { ...this.newLoanApplication, ...this.loanForm.value };
      this.newLoanApplication.UserId = localStorage.getItem('UserId');
      this.loanService.addLoanApplication(this.newLoanApplication).subscribe(
        (response) => {
          console.log('Loan application submitted successfully', this.newLoanApplication);
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/user/userviewloan']);
          }, 2000);
        },
        (error) => {
          console.error('Error submitting loan application', error);
        }
      );
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1]; // Extract Base64 part
        this.newLoanApplication.file = base64String;
        // this.newLoanApplication.fileName = file.name; // Store the file name separately
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  }

  close() {
    this.showPopup = false;
    this.router.navigate(['user/userviewloan']);
    this.loanForm.reset();
  }

  Back() {
    this.router.navigate(['user/userviewloan']);
  }
}
