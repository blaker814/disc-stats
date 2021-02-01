using DiscStats.Models;
using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ScorecardController : ControllerBase
    {
        private readonly IScorecardRepository _scorecardRepo;
        public ScorecardController(IScorecardRepository scorecardRepo)
        {
            _scorecardRepo = scorecardRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetUserScorecards(int id)
        {
            var scorecards = _scorecardRepo.GetUserScorecards(id);
            return Ok(scorecards);
        }

        [HttpPost]
        public IActionResult Post(Scorecard scorecard)
        {
            _scorecardRepo.Add(scorecard);
            return CreatedAtAction("Get", new { id = scorecard.Id }, scorecard);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _scorecardRepo.Delete(id);
            return NoContent();
        }
    }
}
