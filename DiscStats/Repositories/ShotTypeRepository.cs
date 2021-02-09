using DiscStats.Data;
using DiscStats.Models;
using System.Collections.Generic;
using System.Linq;

namespace DiscStats.Repositories
{
    public class ShotTypeRepository : IShotTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public ShotTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ShotType> GetAll()
        {
            return _context.ShotType.ToList();
        }
    }
}
