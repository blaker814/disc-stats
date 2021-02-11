using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IDiscTypeRepository
    {
        List<DiscType> GetAll();
    }
}