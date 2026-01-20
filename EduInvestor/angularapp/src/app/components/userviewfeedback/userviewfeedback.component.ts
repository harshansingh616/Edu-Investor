import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  id:number;
  feedback:Feedback[]=[];
  constructor(private service:FeedbackService) { }
  showPopup:boolean=false;

  ngOnInit(): void {
    this.getFeedbacks();
  }
  
  getFeedbacks(){
    return this.service.getFeedbacks().subscribe(data=>{
    this.feedback=data;
    });
  }

  deleteFeedback(){
    this.service.deleteFeedback(this.id).subscribe(x=>{
      this.getFeedbacks();
      this.showPopup=false;
      
    });  
  }  
  closePopup(){
    this.showPopup=false;
  }

  onConfirm(feedid:number)
  {
    this.id=feedid;
    this.showPopup = true;
  }
}
