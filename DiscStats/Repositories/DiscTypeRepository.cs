using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class DiscTypeRepository : IDiscTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public DiscTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<DiscType> GetAll()
        {
            return _context.DiscType.ToList();
        }
    }
}
