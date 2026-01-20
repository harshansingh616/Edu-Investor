import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm:NgForm;

  Userlogin:Login=
  {
    email:'',
    password:''
  }

  role:string='';
  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  login()
  {
    this.service.login(this.Userlogin).subscribe(()=>{
      console.log("Log in Succesfully");
      this.role=localStorage.getItem('UserRole').toLowerCase();
      console.log(this.role);
      this.router.navigate([`/${this.role}/home`]);
    });
  }

}
