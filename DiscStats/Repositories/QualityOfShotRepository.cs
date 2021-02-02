using DiscStats.Data;
using DiscStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class QualityOfShotRepository : IQualityOfShotRepository
    {
        private readonly ApplicationDbContext _context;

        public QualityOfShotRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<QualityOfShot> GetAll()
        {
            return _context.QualityOfShot.ToList();
        }
    }
}
