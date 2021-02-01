using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface ICourseRepository
    {
        List<Course> GetRecentCourses(int userId);
        List<Course> Search(string criterion);
    }
}