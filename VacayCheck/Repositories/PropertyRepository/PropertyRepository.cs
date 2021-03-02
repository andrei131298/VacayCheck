using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;
using VacayCheck.Contexts;

namespace VacayCheck.Repositories.PropertyRepository
{
    public class PropertyRepository : IPropertyRepository
    {
        public Context _context { get; set; }
        public PropertyRepository(Context context)
        {
            _context = context;
        }
        public Property Create(Property property)
        {
            var result = _context.Add<Property>(property);
            _context.SaveChanges();
            return result.Entity;
        }
        public Property Get(Guid Id)
        {
            return _context.Properties.SingleOrDefault(x => x.id == Id);
        }

        public List<Property> GetAll()
        {
            return _context.Properties.ToList();
        }
        public IEnumerable<Property> GetPropertiesByUser(Guid userId)
        {
            return _context.Properties.ToList().Where(res => res.userId == userId);
        }
        public Property Update(Property property)
        {
            _context.Entry(property).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return property;
        }

        public Property Delete(Property property)
        {
            var result = _context.Remove(property);
            _context.SaveChanges();
            return result.Entity;
        }
    }
}

