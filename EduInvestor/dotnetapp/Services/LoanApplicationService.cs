using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;
namespace dotnetapp.Services
{
    public class LoanApplicationService
    {
        private readonly ApplicationDbContext _context;
        public LoanApplicationService(ApplicationDbContext context)
        {
          _context=context;
        }
        public async Task<IEnumerable<LoanApplication>> GetAllLoanApplications(){
          return await _context.LoanApplications.Include(d=>d.User).Include(d=> d.Loan).ToListAsync();
        }
        public async Task<IEnumerable<LoanApplication>> GetLoanApplicationsByUserId(string userId){
         return await _context.LoanApplications.Include(d=>d.User).Include(d=> d.Loan).Where(a=>a.UserId==userId).ToListAsync();
        }
        public async Task<bool> AddLoanApplication(LoanApplication loanApplication)
        {
          var existingLoanApplication = _context.LoanApplications.FirstOrDefault(la => la.LoanId == loanApplication.LoanId && la.UserId == loanApplication.UserId);
          if (existingLoanApplication != null)
          {
              throw new LoanException("User already applied for this loan");
          }
          _context.LoanApplications.AddAsync(loanApplication);
          _context.SaveChangesAsync();
          return true;
        }
        public async Task<bool> UpdateLoanApplication(int loanApplicationId, LoanApplication loanApplication)
        { 
          var updatedloanApplication = await _context.LoanApplications.FindAsync(loanApplicationId);
          if(updatedloanApplication == null)
          {
            return false;
          }
            updatedloanApplication.Institution = loanApplication.Institution;
            updatedloanApplication.Course = loanApplication.Course;
            updatedloanApplication.TuitionFee = loanApplication.TuitionFee;
            updatedloanApplication.LoanStatus = loanApplication.LoanStatus;
            updatedloanApplication.Address = loanApplication.Address;
            updatedloanApplication.File = loanApplication.File;
            await _context.SaveChangesAsync();
          return true;
        }
        public async Task<bool>DeleteLoanApplication(int loanApplicationId)
        {
            var loanApplication = _context.LoanApplications.Find(loanApplicationId);
            if(loanApplication == null)
                return false;
            _context.LoanApplications.Remove(loanApplication);
            _context.SaveChanges();
            return true;
        }
    }
}