using DiscStats.Data;
using DiscStats.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class ShotRepository : IShotRepository
    {
        private readonly ApplicationDbContext _context;

        public ShotRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Shot> GetByUserId(int id)
        {
            return _context.Shot.Where(s => s.UserId == id).ToList();
        }

        public Shot GetById(int id)
        {
            return _context.Shot.FirstOrDefault(s => s.Id == id);
        }

        public List<Shot> GetByHoleId(int id)
        {
            return _context.Shot.Where(s => s.HoleId == id).ToList();
        }

        public List<Shot> GetByScorecardId(int id)
        {
            return _context.Shot.Where(s => s.ScorecardId == id).ToList();
        }

        public List<Shot> GetByCourseId(int id)
        {
            return _context.Shot
                .Include(s => s.Hole)
                .Where(s => s.Hole.CourseId == id)
                .ToList();
        }

        public List<Shot> GetByDiscId(int id)
        {
            return _context.Shot.Where(s => s.DiscId == id).ToList();
        }

        public void Add(Shot shot)
        {
            _context.Add(shot);
            _context.SaveChanges();
        }

        public void Update(Shot shot)
        {
            var originalShot = GetById(shot.Id);
            if (originalShot == null)
            {
                return;
            }
            _context.Entry(originalShot).State = EntityState.Detached;
            _context.Entry(shot).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var shot = GetById(id);
            _context.Shot.Remove(shot);
            _context.SaveChanges();
        }
    }
}
