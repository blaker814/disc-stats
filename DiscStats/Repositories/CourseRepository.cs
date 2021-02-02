﻿using DiscStats.Data;
using DiscStats.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscStats.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Course> GetRecentCourses(int userId)
        {
            var recentScorecards = _context.Scorecard
                .Include(s => s.Course)
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.CreateDateTime)
                .ToList();

            return recentScorecards.Select(s => s.Course)
                .Distinct()
                .Take(5)
                .ToList();
        }

        public List<Course> Search(string criterion)
        {
            return _context.Course
                .Where(c => c.Name.Contains(criterion) || c.Location.Contains(criterion))
                .ToList();
        }
    }
}