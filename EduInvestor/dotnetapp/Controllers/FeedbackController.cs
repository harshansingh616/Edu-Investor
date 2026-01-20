using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Cors;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    [EnableCors("corsapp")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        public FeedbackController(FeedbackService feedback)
        {
            _feedbackService=feedback;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>>GetAllFeedbacks(){
            try
            {
                var feedbacks=await _feedbackService.GetAllFeedbacks();

                return Ok(feedbacks);
            }
            catch(LoanException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            
        }
        [HttpGet("{userId}")]

        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(string userId)
        {
            try
            {

            var feedbacks=_feedbackService.GetFeedbacksByUserId(userId);
            return Ok(feedbacks);

            }catch(LoanException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
               await _feedbackService.AddFeedback(feedback);
                Console.WriteLine("Feedback added"+feedback);
                return Ok();
                //"Feedback added successfully"
            }
            catch(LoanException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete ("{feedbackId}")]

        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                var feedbacks= await _feedbackService.DeleteFeedback(feedbackId);

                if(feedbacks)
                {
                    //"Feedback deleted successfully"
                    return Ok();
                }
                else
                {
                    return NotFound("Cannot find any feedback");
                }
            } 
            catch(LoanException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
