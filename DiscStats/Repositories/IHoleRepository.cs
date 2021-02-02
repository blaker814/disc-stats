using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IHoleRepository
    {
        List<Hole> GetHolesByCourseId(int id);
    }
}