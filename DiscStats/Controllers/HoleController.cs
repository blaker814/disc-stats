using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("course/{id}")]
        public IActionResult GetHolesByCourseId(int id)
        {
            var courseHoles = _holeRepo.GetHolesByCourseId(id);

            if (courseHoles == null)
            {
                return NotFound();
            }

            return Ok(courseHoles);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var hole = _holeRepo.GetById(id);

            if(hole == null)
            {
                return NotFound();
            }

            return Ok(hole);
        }
    }
}
