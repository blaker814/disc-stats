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
    public class CourseController : ControllerBase
    {

        private readonly ICourseRepository _courseRepo;
        public CourseController(ICourseRepository courseRepo)
        {
            _courseRepo = courseRepo;
        }

        [HttpGet("{id}")]
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

            return Ok(_courseRepo.Search(q));
        }
    }
}
