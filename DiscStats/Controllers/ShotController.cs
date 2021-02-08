using DiscStats.Models;
using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class ShotController : ControllerBase
    {
        private readonly IShotRepository _shotRepo;
        public ShotController(IShotRepository shotRepo)
        {
            _shotRepo = shotRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var shot = _shotRepo.GetById(id);
            if (shot == null)
            {
                return NotFound();
            }

            return Ok(shot);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(int id)
        {
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
            var shots = _shotRepo.GetByCourseId(id);
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

            return Ok(shots);
        }

        [HttpGet("hole/{id}")]
        public IActionResult GetByHoleId(int id)
        {
            var shots = _shotRepo.GetByHoleId(id);
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

            return Ok(shots);
        }

        [HttpPost]
        public IActionResult Post(Shot shot)
        {
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

            _shotRepo.Update(shot);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _shotRepo.Delete(id);
            return NoContent();
        }
    }
}
