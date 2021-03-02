using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.PropertyRepository
{
    public interface IPropertyRepository
    {
        List<Property> GetAll();
        Property Get(Guid id);
        IEnumerable<Property> GetPropertiesByUser(Guid userId);

        Property Create(Property Property);
        Property Update(Property Property);
        Property Delete(Property Property);
    }
}
