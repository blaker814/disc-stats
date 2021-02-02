using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IShotSelectionRepository
    {
        List<ShotSelection> GetAll();
    }
}