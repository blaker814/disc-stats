using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
