using DiscStats.Data;
using DiscStats.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DiscStats.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Course> Get()
        {
            return _context.Course.OrderBy(c => c.Name).ToList();
        }

        public Course GetById(int id)
        {
            return _context.Course.FirstOrDefault(c => c.Id == id);
        }

        public List<Course> GetRecentCourses(int userId)
        {
            var recentScorecards = _context.Scorecard
                .Include(s => s.Course)
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.CreateDateTime)
                .ToList();

            return recentScorecards.Select(s => s.Course)
                .Distinct()
                .Take(5)
                .ToList();
        }

        public List<Course> Search(string criterion)
        {
            return _context.Course
                .Where(c => c.Name.ToLower().Contains(criterion) || c.Location.ToLower().Contains(criterion))
                .ToList();
        }
    }
}
