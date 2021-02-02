using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class ConditionsRepository : IConditionsRepository
    {
        private readonly ApplicationDbContext _context;

        public ConditionsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Conditions> GetAll()
        {
            return _context.Conditions.ToList();
        }
    }
}
