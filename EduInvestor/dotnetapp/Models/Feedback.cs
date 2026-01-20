using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Feedback
    {
        public int FeedbackId{get; set;}

        public string UserId{get; set;}

        public User? User{get; set;}

        public string FeedbackText{get; set;}

        public DateTime Date{get; set;}
    }
}