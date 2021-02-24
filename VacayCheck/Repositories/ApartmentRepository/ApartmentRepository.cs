using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;
using VacayCheck.Contexts;

namespace VacayCheck.Repositories.ApartmentRepository
{
    public class ApartmentRepository : IApartmentRepository
    {
        public Context _context { get; set; }
        public ApartmentRepository(Context context)
        {
            _context = context;
        }
        public Apartment Create(Apartment adress)
        {
            var result = _context.Add<Apartment>(adress);
            _context.SaveChanges();
            return result.Entity;
        }
        public Apartment Get(int Id)
        {
            return _context.Apartments.SingleOrDefault(x => x.id == Id);
        }
        public IEnumerable<Apartment> GetApartmentsByPropertyId(int propertyId)
        {
            return _context.Apartments.ToList().Where(ap => ap.propertyId == propertyId);
        }
        public List<Apartment> GetAll()
        {
            return _context.Apartments.ToList();
        }

        public Apartment Update(Apartment adress)
        {
            _context.Entry(adress).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return adress;
        }

        public Apartment Delete(Apartment adress)
        {
            var result = _context.Remove(adress);
            _context.SaveChanges();
            return result.Entity;
        }
    }
}

