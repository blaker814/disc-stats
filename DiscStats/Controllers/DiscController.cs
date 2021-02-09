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
        private readonly IUserRepository _userRepo;
        public DiscController(IDiscRepository discRepo, IUserRepository userRepo)
        {
            _discRepo = discRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetByUserId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            var discs = _discRepo.GetByUserId(id);
            if (discs == null)
            {
                return NotFound();
            }

            return Ok(discs);
        }

        [HttpGet("edit/{id}")]
        public IActionResult GetById(int id)
        {

            var disc = _discRepo.GetById(id);
            if (disc == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != disc.UserId)
            {
                return Unauthorized();
            }

            return Ok(disc);
        }

        [HttpPost]
        public IActionResult Post(Disc disc)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != disc.UserId)
            {
                return Unauthorized();
            }

            disc.IsActive = true;
            _discRepo.Add(disc);
            return Ok(disc);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Disc disc)
        {
            if (id != disc.Id)
            {
                return BadRequest();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != disc.UserId)
            {
                return Unauthorized();
            }

            _discRepo.Update(disc);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var disc = _discRepo.GetById(id);
            if (disc == null)
            {
                return NotFound();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != disc.UserId)
            {
                return Unauthorized();
            }

            _discRepo.Delete(disc);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
