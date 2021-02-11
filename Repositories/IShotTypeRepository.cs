using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IShotTypeRepository
    {
        List<ShotType> GetAll();
    }
}