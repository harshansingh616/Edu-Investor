using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using System.Threading.Tasks;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/loan")]
    [Authorize]
    [EnableCors("corsapp")]
    public class LoanController : ControllerBase
    {
        private readonly LoanService _loanService;
        public LoanController(LoanService loanService)
        {
            _loanService = loanService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetAllLoans()
        {
            try
            {
                var loans = await _loanService.GetAllLoans();
                return Ok(loans);
            }
            catch (LoanException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{loanId}")]
        public async Task<ActionResult<Loan>> GetLoanById(int loanId)
        {
            try
            {
                var loan = await _loanService.GetLoanById(loanId);
                if (loan == null)
                {
                    return NotFound("Cannot find any loan application");
                }
                return Ok(loan);
            }
            catch (LoanException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]

        public async Task<ActionResult> AddLoan([FromBody] Loan loan)
        {
            try
            {
                var result = await _loanService.AddLoan(loan);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    throw new LoanException("Failed to add loan");
                }

            }
            catch (LoanException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{loanId}")]
        public async Task<ActionResult> UpdateLoan(int loanId, [FromBody] Loan loan)
        {
            try
            {
                var result = await _loanService.UpdateLoan(loanId, loan);
                if (result)
                {
                    //"Loan application updated successfully"
                    return Ok();
                }
                return NotFound("Cannot find any loan");
            }
            catch (LoanException ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [HttpDelete("{loanId}")]

        public async Task<ActionResult> DeleteLoan(int loanId)
        {
            try
            {
                var result = await _loanService.DeleteLoan(loanId);
                if (result)
                {
                    //"Loan application deleted successfully"
                    return Ok();
                }
                return NotFound("Cannot find any loan");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}