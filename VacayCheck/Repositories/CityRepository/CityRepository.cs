using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;
using VacayCheck.Contexts;

namespace VacayCheck.Repositories.CityRepository
{
        public class CityRepository : ICityRepository
        {
            public Context _context { get; set; }
            public CityRepository(Context context)
            {
                _context = context;
            }
            public City Create(City city)
            {
                var result = _context.Add<City>(city);
                _context.SaveChanges();
                return result.Entity;
            }
            public City Get(int Id)
            {
                return _context.Cities.SingleOrDefault(x => x.id == Id);
            }

            public List<City> GetAll()
            {
                return _context.Cities.ToList();
            }

            public City Update(City city)
            {
                _context.Entry(city).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
                return city;
            }

            public City Delete(City city)
            {
                var result = _context.Remove(city);
                _context.SaveChanges();
                return result.Entity;
            }
        }
    }

