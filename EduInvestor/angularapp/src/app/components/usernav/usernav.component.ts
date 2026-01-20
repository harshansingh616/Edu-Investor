import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  constructor(private service:AuthService, private route:Router) { }

  currentLoggedinUser:string;

  showLogoutPopup=false;

  ngOnInit(): void
  {
    this.currentLoggedinUser=localStorage.getItem('username')
  }
  logout()
  {
    this.service.logout();

    this.route.navigate(['/login']);

    localStorage.clear();
    
    this.showLogoutPopup=false;
  }
  

}
