using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IScorecardRepository
    {
        void Add(Scorecard scorecard);
        void Delete(int id);
        Scorecard GetById(int id);
        List<Scorecard> GetUserScorecards(int id);
    }
}