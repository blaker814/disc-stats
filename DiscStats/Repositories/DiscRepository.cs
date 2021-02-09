using DiscStats.Data;
using DiscStats.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class DiscRepository : IDiscRepository
    {
        private readonly ApplicationDbContext _context;

        public DiscRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Disc GetById(int id)
        {
            return _context.Disc.FirstOrDefault(d => d.Id == id);
        }

        public List<Disc> GetByUserId(int id)
        {
            return _context.Disc
                .Include(d => d.DiscType)
                .Where(d => d.UserId == id && d.IsActive == true)
                .OrderBy(d => d.Name)
                .ToList();
        }

        public void Add(Disc disc)
        {
            _context.Add(disc);
            _context.SaveChanges();
        }

        public void Update(Disc disc)
        {
            var originalDisc = GetById(disc.Id);
            if (originalDisc == null)
            {
                return;
            }
            _context.Entry(originalDisc).State = EntityState.Detached;
            _context.Entry(disc).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(Disc disc)
        {
            disc.IsActive = false;
            _context.Entry(disc).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
