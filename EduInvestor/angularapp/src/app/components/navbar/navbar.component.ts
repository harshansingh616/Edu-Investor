import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  isUser(){
    return this.service.isUser();
  }

  isAdmin(){
    return this.service.isAdmin();
  }

  isLoggedIn(){
    return this.service.isLoggedIn();
  }

  logout(){
    this.service.logout();
    this.route.navigate(['/login']);
  }
}
