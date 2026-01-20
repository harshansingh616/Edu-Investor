using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;
         public FeedbackService(ApplicationDbContext context)
         {
             _context=context;
         }
        public async Task<IEnumerable<Feedback>>GetAllFeedbacks(){
            return await _context.Feedbacks.Include(f=>f.User).ToListAsync();

        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(string userId){

            return _context.Feedbacks.Include(f=>f.User).Where(c=>c.UserId==userId).ToList();   
               
        }

        public async Task<bool> AddFeedback(Feedback feedback){
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedback(int feedbackId){
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if(feedback==null)
            {
                return false;
            }
            _context.Feedbacks.Remove(feedback);
            _context.SaveChangesAsync();
            return true;
        }
    }
}