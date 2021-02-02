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
    public class HoleController : ControllerBase
    {
        private readonly IHoleRepository _holeRepo;
        public HoleController(IHoleRepository holeRepo)
        {
            _holeRepo = holeRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetHolesByCourseId(int id)
        {
            var courseHoles = _holeRepo.GetHolesByCourseId(id);

            if (courseHoles == null)
            {
                return NotFound();
            }

            return Ok(courseHoles);
        }
    }
}
