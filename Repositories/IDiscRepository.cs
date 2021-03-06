﻿using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IDiscRepository
    {
        void Add(Disc disc);
        void Delete(Disc disc);
        Disc GetById(int id);
        List<Disc> GetByUserId(int id);
        void Update(Disc disc);
    }
}