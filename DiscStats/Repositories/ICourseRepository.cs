using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface ICourseRepository
    {
        List<Course> Get();
        Course GetById(int id);
        List<Course> GetRecentCourses(int userId);
        List<Course> Search(string criterion);
    }
}