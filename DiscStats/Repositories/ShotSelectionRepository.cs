using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class ShotSelectionRepository : IShotSelectionRepository
    {
        private readonly ApplicationDbContext _context;

        public ShotSelectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ShotSelection> GetAll()
        {
            return _context.ShotSelection.ToList();
        }
    }
}
