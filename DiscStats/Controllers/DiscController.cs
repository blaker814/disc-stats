using DiscStats.Models;
using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DiscController : ControllerBase
    {
        private readonly IDiscRepository _discRepo;
        public DiscController(IDiscRepository discRepo)
        {
            _discRepo = discRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetByUserId(int id)
        {
            var discs = _discRepo.GetByUserId(id);
            return Ok(discs);
        }

        [HttpPost]
        public IActionResult Post(Disc disc)
        {
            disc.IsActive = true;
            _discRepo.Add(disc);
            return CreatedAtAction("Get", new { id = disc.Id }, disc);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Disc disc)
        {
            if (id != disc.Id)
            {
                return BadRequest();
            }

            _discRepo.Update(disc);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _discRepo.Delete(id);
            return NoContent();
        }
    }
}
