import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks:Feedback[]=[];

  currentUser:User;

  // UserId=JSON.parse(localStorage.getItem("userId"));

  //currentUser: User | null = null; 

  UserId = JSON.parse(localStorage.getItem("userId") || 'null');

  constructor(private service:FeedbackService) { }

  ngOnInit(): void {
    this.loadfeedbacks();
  }

  loadfeedbacks():void
  {
   
   this.service.getFeedbacks().subscribe(

    (data:Feedback[])=>{
      console.log(data);

      this.feedbacks=data;

      console.log("getting admin feedbacks", this.feedbacks);
    },
     (error)=>{
       console.log('Error fetching the feedbacks', error);
     }
   );
  }
  
   showProfile(user:User):void
  {
    this.currentUser=user;
  }
  closeModal():void{
    this.currentUser=null;
  }

}
