using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class ScorecardRepository : IScorecardRepository
    {
        private readonly ApplicationDbContext _context;

        public ScorecardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Scorecard> GetUserScorecards(int id)
        {
            return _context.Scorecard.Where(s => s.UserId == id).ToList();
        }

        public Scorecard GetById(int id)
        {
            return _context.Scorecard.FirstOrDefault(s => s.Id == id);
        }

        public void Add(Scorecard scorecard)
        {
            _context.Add(scorecard);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var relatedShots = _context.Shot.Where(s => s.ScorecardId == id);
            _context.RemoveRange(relatedShots);

            var scorecard = GetById(id);
            _context.Scorecard.Remove(scorecard);
            _context.SaveChanges();
        }
    }
}
