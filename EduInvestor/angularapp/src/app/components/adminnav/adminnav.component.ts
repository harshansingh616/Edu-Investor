import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent{
  currentLoggedInUser:string;
  showLogoutPopup=false;
  
  constructor(private service:AuthService,private location:Location)
  { 
    this.currentLoggedInUser=localStorage.getItem('username')
  }

 logout()
 {
  this.service.logout();
  //this.router.navigate(['/login']);
  this.location.go('/login');
  localStorage.clear();
  this.showLogoutPopup=false;
 }


}
