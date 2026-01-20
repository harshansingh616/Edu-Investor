import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  @ViewChild('feedbackForm') feedbackForm:NgForm;
  showPopup: boolean = false;
  subdate=new Date();
  feedback: Feedback = {
    feedbackId:0,
    userId:'',

    feedbackText:'',
    date:new Date(),
  };

  
  
  constructor( private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void { }

  submit() {
    this.showPopup = true;
    this.feedback.date = new Date();
    this.feedback.userId = localStorage.getItem('UserId');
    this.feedbackService.sendFeedback(this.feedback).subscribe(data => { 
    });
  }
  
  closePopup() {
    this.showPopup = false;
    this.feedbackForm.reset();
  }
}


