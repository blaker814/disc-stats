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

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var shots = _shotRepo.GetByUserId(id);
            return Ok(shots);
        }

        [HttpGet("course/{id}")]
        public IActionResult GetByCourseId(int id)
        {
            var shots = _shotRepo.GetByCourseId(id);
            return Ok(shots);
        }

        [HttpGet("scorecard/{id}")]
        public IActionResult GetByScorecardId(int id)
        {
            var shots = _shotRepo.GetByScorecardId(id);
            return Ok(shots);
        }

        [HttpGet("hole/{id}")]
        public IActionResult GetByHoleId(int id)
        {
            var shots = _shotRepo.GetByHoleId(id);
            return Ok(shots);
        }

        [HttpPost]
        public IActionResult Post(Shot shot)
        {
            _shotRepo.Add(shot);
            return CreatedAtAction("Get", new { id = shot.Id }, shot);
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
