﻿using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IScorecardRepository
    {
        void Add(Scorecard scorecard);
        void Delete(Scorecard scorecard);
        Scorecard GetById(int id);
        List<Scorecard> GetUserScorecards(int id);
        List<Scorecard> GetByCourseId(int id, int userId);
    }
}