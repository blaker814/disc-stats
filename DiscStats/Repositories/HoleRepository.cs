using DiscStats.Data;
using DiscStats.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class HoleRepository : IHoleRepository
    {
        private readonly ApplicationDbContext _context;

        public HoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Hole> GetHolesByCourseId(int id)
        {
            return _context.Hole.Where(h => h.CourseId == id).ToList();
        }

        public Hole GetById(int id)
        {
            return _context.Hole.FirstOrDefault(h => h.Id == id);
        }
    }
}
