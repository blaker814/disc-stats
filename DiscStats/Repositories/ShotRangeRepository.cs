using DiscStats.Data;
using DiscStats.Models;
using System.Collections.Generic;
using System.Linq;

namespace DiscStats.Repositories
{
    public class ShotRangeRepository : IShotRangeRepository
    {
        private readonly ApplicationDbContext _context;

        public ShotRangeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ShotRange> GetAll()
        {
            return _context.ShotRange.ToList();
        }
    }
}
