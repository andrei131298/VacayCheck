using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.CityRepository
{
    public interface ICityRepository
    {
        List<City> GetAll();
        City Get(Guid id);
        City Create(City City);
        City Update(City City);
        City Delete(City City);

    }
}
