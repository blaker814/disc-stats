using DiscStats.Data;
using DiscStats.Models;
using System.Collections.Generic;
using System.Linq;

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
