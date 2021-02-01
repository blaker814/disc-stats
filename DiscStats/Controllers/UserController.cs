using DiscStats.Models;
using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        public UserController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            var user = _repo.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _repo.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }
    }
}