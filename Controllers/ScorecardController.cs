using DiscStats.Models;
using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace DiscStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ScorecardController : ControllerBase
    {
        private readonly IScorecardRepository _scorecardRepo;
        private readonly IUserRepository _userRepo;
        private readonly IShotRepository _shotRepo;
        public ScorecardController(IScorecardRepository scorecardRepo, IUserRepository userRepo, IShotRepository shotRepo)
        {
            _scorecardRepo = scorecardRepo;
            _userRepo = userRepo;
            _shotRepo = shotRepo;
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserScorecards(int id)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            var scorecards = _scorecardRepo.GetUserScorecards(id);
            if (scorecards == null)
            {
                return NotFound();
            }

            return Ok(scorecards);
        }

        [HttpGet("course/{id}")]
        public IActionResult GetByCourseId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var scorecards = _scorecardRepo.GetByCourseId(id, currentUser.Id);
            if (scorecards == null)
            {
                return NotFound();
            }

            var filteredScorecards = scorecards.Where(s =>
            {
                var scorecardShots = _shotRepo.GetByScorecardId(s.Id);
                return scorecardShots.Count > 0;
            });

            return Ok(filteredScorecards);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var scorecard = _scorecardRepo.GetById(id);
            if (scorecard == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != scorecard.UserId)
            {
                return Unauthorized();
            }

            return Ok(scorecard);
        }

        [HttpPost]
        public IActionResult Post(Scorecard scorecard)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != scorecard.UserId)
            {
                return Unauthorized();
            }

            scorecard.CreateDateTime = DateTime.Now;
            _scorecardRepo.Add(scorecard);
            return Ok(scorecard);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var scorecard = _scorecardRepo.GetById(id);
            if (scorecard == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != scorecard.UserId)
            {
                return Unauthorized();
            }

            _scorecardRepo.Delete(scorecard);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
