import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';
import {HttpClient, HttpHeaders} from'@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  public apiUrl="https://8080-eabfdcaffafbbafeaffcbfbacbacdcef.premiumproject.examly.io";

  constructor(private http:HttpClient, private authserv:AuthService) { }
  sendFeedback(feedback: Feedback):Observable<Feedback>
  {
    const headers=this.authserv.getAuthHeaders();
    return this.http.post<Feedback>(`${this.apiUrl}/api/feedback`,feedback, {headers});
  }
  getAllFeedbacksByUserId(userId:string):Observable<Feedback[]>
  {
    const headers=this.authserv.getAuthHeaders();
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/${userId}`, {headers});

  }
  deleteFeedback(feedbackId:number):Observable<void>
  {
    const headers=this.authserv.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/feedback/${feedbackId}`, {headers});
  }
  getFeedbacks():Observable<Feedback[]>
  {
    const headers=this.authserv.getAuthHeaders();
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`, {headers});
  }
 }
