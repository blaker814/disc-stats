using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
