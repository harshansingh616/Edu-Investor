using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class LoanService
    {
        private readonly ApplicationDbContext _context;
        public LoanService(ApplicationDbContext context)
        {
            _context=context;
        }
        public async Task<IEnumerable<Loan>>GetAllLoans(){
           return await _context.Loans.ToListAsync();
        }

        public async Task<Loan> GetLoanById(int loanId){
          
            return await _context.Loans.FindAsync(loanId);
        }

        public async Task<bool> AddLoan(Loan loan){
            if(await _context.Loans.AnyAsync(a=>a.LoanType == loan.LoanType))
            {
                throw new LoanException("Loan with the same type already exists");
            }
            else
            {
                _context.Loans.Add(loan);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> UpdateLoan(int loanId, Loan loan){
            var existloan= await _context.Loans.FindAsync(loanId);
            if(existloan==null)
            {
                return false;
            }
            // if(await _context.Loans.AnyAsync(a=>a.LoanType == loan.LoanType))
            // {
            //     throw new LoanException("Loan with the same type already exists");
            // }
            else
            {
                existloan.LoanType=loan.LoanType;
                existloan.Description=loan.Description;
                existloan.InterestRate=loan.InterestRate;
                existloan.MaximumAmount=loan.MaximumAmount;
                existloan.RepaymentTenure=loan.RepaymentTenure;
                existloan.Eligibility=loan.Eligibility;
                existloan.DocumentsRequired=loan.DocumentsRequired;
                await _context.SaveChangesAsync();
                return true;
            }

        }

        public async Task<bool>DeleteLoan(int loanId){
            var loan= await _context.Loans.FindAsync(loanId);
            if(loan==null)
            {
                return false;
            }
            if(await _context.LoanApplications.AnyAsync(a=>a.LoanId == loanId))
            {
                throw new LoanException("Loan cannot be deleted, it is referenced in loanapplication");
            }
            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}