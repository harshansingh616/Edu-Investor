using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class LoanApplication
    {
        public int LoanApplicationId {get; set;}
        public string UserId{get; set;}
        public User? User{get; set;}
        public int LoanId{get; set;}
        public Loan? Loan{get; set;}
        public string SubmissionDate{get; set;}
        public string Institution{get; set;}
        public string Course{get; set;}
        public decimal TuitionFee{get; set;}
        public int LoanStatus{get; set;}
        public string Address{get; set;}
        public string File{get; set;}
        

    }
}