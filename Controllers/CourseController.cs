using DiscStats.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DiscStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CourseController : ControllerBase
    {

        private readonly ICourseRepository _courseRepo;
        public CourseController(ICourseRepository courseRepo)
        {
            _courseRepo = courseRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_courseRepo.Get());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_courseRepo.GetById(id));
        }

        [HttpGet("recent/{id}")]
        public IActionResult GetRecent(int id)
        {
            var recentCourses = _courseRepo.GetRecentCourses(id);
            return Ok(recentCourses);
        }

        [HttpGet("{userId}/search")]
        public IActionResult Search(int userId, string q)
        {
            if (q == null)
            {
                return Ok(_courseRepo.GetRecentCourses(userId));
            }

            return Ok(_courseRepo.Search(q.Trim().ToLower()));
        }
    }
}
