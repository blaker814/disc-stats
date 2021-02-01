using DiscStats.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class ShotRepository
    {
        private readonly ApplicationDbContext _context;

        public ShotRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
