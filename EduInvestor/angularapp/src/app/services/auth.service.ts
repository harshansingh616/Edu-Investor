import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  public apiUrl="https://8080-eabfdcaffafbbafeaffcbfbacbacdcef.premiumproject.examly.io";
  //https://8080-eabfdcaffafbbafeaffcbfbacbacdcef.premiumproject.examly.io

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> 
  {
    user.userId='1';
    return this.http.post<any>(`${this.apiUrl}/api/register`, user).pipe(
      tap((response)=>
      {
        localStorage.setItem("userInfo",JSON.stringify(user));

      })
    );
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`,login).pipe(
      tap((response)=>{
        console.log(response.token);
        if(response && response.token)
        {
          localStorage.setItem('authToken',response.token);
          const tokenPart=response.token.split('.'); 
          let payload=JSON.parse(atob(tokenPart[1]));
          const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
          localStorage.setItem('UserRole',payload[roleKey]);
          const roleId = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          localStorage.setItem('UserId',payload[roleId]);        
          
        }
      }
      )
    );
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  isLoggedIn()
  {
    if(localStorage.getItem('UserRole')==='Admin' || localStorage.getItem('UserRole')==='User')
    {
      return true;
    } 
    return false;
  }

  isAdmin()
  {
    return localStorage.getItem('UserRole')==='Admin';
  }
  
  isUser()
  {
    return localStorage.getItem('UserRole')==='User';

  }

  logout()
  {
    localStorage.clear(); 
  }

}
