﻿using DiscStats.Models;
using System.Collections.Generic;

namespace DiscStats.Repositories
{
    public interface IConditionsRepository
    {
        List<Conditions> GetAll();
    }
}