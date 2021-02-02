using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IQualityOfShotRepository
    {
        List<QualityOfShot> GetAll();
    }
}