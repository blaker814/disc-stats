using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IShotRepository
    {
        void Add(Shot shot);
        void Delete(Shot shot);
        void Update(Shot shot);
        List<Shot> GetByCourseId(int id, int userId);
        List<Shot> GetByHoleId(int id, int userId);
        List<Shot> GetByHoleAndScorecardId(int id, int scorecardId);
        List<Shot> GetByDiscId(int id);
        Shot GetById(int id);
        List<Shot> GetByScorecardId(int id);
        List<Shot> GetByUserId(int id);
    }
}