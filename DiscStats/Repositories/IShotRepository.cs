using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IShotRepository
    {
        void Add(Shot shot);
        void Delete(int id);
        void Update(Shot shot);
        List<Shot> GetByCourseId(int id);
        List<Shot> GetByHoleId(int id);
        List<Shot> GetByDiscId(int id);
        Shot GetById(int id);
        List<Shot> GetByScorecardId(int id);
        List<Shot> GetByUserId(int id);
    }
}