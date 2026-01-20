import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  RegistrationForm=NgForm;
  showPopup:boolean=false;
 
  user:User={
   username:'',
   email:'',
   password:'',
   mobileNumber:'',
   userRole:'Admin'
  }
  constructor( private route:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  register(){
    
      this.authService.register(this.user).subscribe(()=>{
        // this.route.navigate(['/login']);
    });
    
  }
  closePopup() 
  {
    this.showPopup = false;
    this.route.navigate(['/login']);
  }


}
