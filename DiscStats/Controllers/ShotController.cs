using DiscStats.Models;
using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DiscStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ShotController : ControllerBase
    {
        private readonly IShotRepository _shotRepo;
        private readonly IUserRepository _userRepo;
        public ShotController(IShotRepository shotRepo, IUserRepository userRepo)
        {
            _shotRepo = shotRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var shot = _shotRepo.GetById(id);
            if (shot == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shot.UserId)
            {
                return Unauthorized();
            }

            return Ok(shot);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            var shots = _shotRepo.GetByUserId(id);
            if (shots == null)
            {
                return NotFound();
            }

            return Ok(shots);
        }

        [HttpGet("course/{id}")]
        public IActionResult GetByCourseId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var shots = _shotRepo.GetByCourseId(id, currentUser.Id);
            if (shots == null)
            {
                return NotFound();
            }

            return Ok(shots);
        }

        [HttpGet("scorecard/{id}")]
        public IActionResult GetByScorecardId(int id)
        {
            var shots = _shotRepo.GetByScorecardId(id);
            if (shots == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shots[0].UserId)
            {
                return Unauthorized();
            }

            return Ok(shots);
        }

        [HttpGet("hole/{id}")]
        public IActionResult GetByHoleId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var shots = _shotRepo.GetByHoleId(id, currentUser.Id);
            if (shots == null)
            {
                return NotFound();
            }

            return Ok(shots);
        }

        [HttpGet("hole/{id}/{scorecardId}")]
        public IActionResult GetByHoleAndScorecardId(int id, int scorecardId)
        {
            var shots = _shotRepo.GetByHoleAndScorecardId(id, scorecardId);
            if (shots == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shots[0].UserId)
            {
                return Unauthorized();
            }

            return Ok(shots);
        }

        [HttpGet("disc/{id}")]
        public IActionResult GetByDiscId(int id)
        {
            var shots = _shotRepo.GetByDiscId(id);
            if (shots == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shots[0].UserId)
            {
                return Unauthorized();
            }

            return Ok(shots);
        }

        [HttpPost]
        public IActionResult Post(Shot shot)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shot.UserId)
            {
                return Unauthorized();
            }

            _shotRepo.Add(shot);
            return Ok(shot);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Shot shot)
        {
            if (id != shot.Id)
            {
                return BadRequest();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shot.UserId)
            {
                return Unauthorized();
            }

            _shotRepo.Update(shot);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var shot = _shotRepo.GetById(id);
            if (shot == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != shot.UserId)
            {
                return Unauthorized();
            }

            _shotRepo.Delete(shot);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
