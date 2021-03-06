﻿using DiscStats.Data;
using DiscStats.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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
            return _context.Shot
                .Include(s => s.Hole)
                .Where(s => s.UserId == id)
                .ToList();
        }

        public Shot GetById(int id)
        {
            return _context.Shot.FirstOrDefault(s => s.Id == id);
        }

        public List<Shot> GetByHoleId(int id, int userId)
        {
            return _context.Shot
                .Include(s => s.Hole)
                .Include(h => h.Disc)
                .Include(h => h.ShotSelection)
                .Include(h => h.ShotType)
                .Include(h => h.ShotRange)
                .Include(h => h.QualityOfShot)
                .Where(s => s.HoleId == id && s.UserId == userId)
                .OrderByDescending(s => s.Id)
                .ToList();
        }

        public List<Shot> GetByHoleAndScorecardId(int id, int scorecardId)
        {
            return _context.Shot
                .Include(h => h.Disc)
                .Include(h => h.ShotSelection)
                .Include(h => h.ShotType)
                .Include(h => h.ShotRange)
                .Include(h => h.QualityOfShot)
                .Where(s => s.HoleId == id && s.ScorecardId == scorecardId)
                .OrderBy(s => s.Id)
                .ToList();
        }

        public List<Shot> GetByScorecardId(int id)
        {
            return _context.Shot
                .Include(s => s.Hole)
                .Where(s => s.ScorecardId == id)
                .ToList();
        }

        public List<Shot> GetByCourseId(int id, int userId)
        {
            return _context.Shot
                .Include(s => s.Hole)
                .Where(s => s.Hole.CourseId == id && s.UserId == userId)
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

        public void Delete(Shot shot)
        {
            _context.Shot.Remove(shot);
            _context.SaveChanges();
        }
    }
}
