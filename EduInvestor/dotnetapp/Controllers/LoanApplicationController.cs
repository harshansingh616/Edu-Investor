using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.AspNetCore.Cors;
using System.Reflection;
using dotnetapp.Exceptions;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/loanapplication")]
    [EnableCors("corsapp")]
    public class LoanApplicationController : ControllerBase
    {
        private readonly LoanApplicationService _loanApplicationService;
        public LoanApplicationController(LoanApplicationService loanApplicationService)
        {
            _loanApplicationService = loanApplicationService;
        }
        [HttpGet]
        public async Task <ActionResult<IEnumerable<LoanApplication>>> GetAllLoanApplications()
        {
            try
            {
                var loanApplications = await _loanApplicationService.GetAllLoanApplications();
                return Ok(loanApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<LoanApplication>> GetLoanApplicationByUserId(string userId)
        {
            try
            {
                var loanApplications = await _loanApplicationService.GetLoanApplicationsByUserId(userId);
                if (loanApplications == null)
                {
                    return NotFound("Cannot find any loan application");
                }
                return Ok(loanApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<ActionResult> AddLoanApplication([FromBody] LoanApplication loanApplication)
        {
            try
            {
                var result = await _loanApplicationService.AddLoanApplication(loanApplication);
                if(result)
                {
                    return Ok();
                    //"Loan application added successfully"
                }
                else
                {
                    throw new LoanException("Failed to add loan application");
                }
                
            }
            catch (LoanException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{loanApplicationId}")]
        public async Task<ActionResult> UpdateLoanApplication(int loanApplicationId, [FromBody] LoanApplication loanApplication)
        {
            try
            {
                var result = await _loanApplicationService.UpdateLoanApplication(loanApplicationId, loanApplication);
                if (result == null)
                {
                    return NotFound("Cannot find any loan application");
                }
                return Ok("Loan application updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{loanApplicationId}")]
        public async Task<ActionResult> DeleteLoanApplication(int loanApplicationId)
        {
            try
            {
                var result = await _loanApplicationService.DeleteLoanApplication(loanApplicationId);
                if (result == null)
                {
                    return NotFound("Cannot find any loan application");
                }
                return Ok();
                //"Loan application deleted successfully"
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}