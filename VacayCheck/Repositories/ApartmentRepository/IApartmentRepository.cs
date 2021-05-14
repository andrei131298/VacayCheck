using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.ApartmentRepository
{
    public interface IApartmentRepository
    {
        List<Apartment> GetAll();
        Apartment Get(Guid id);
        IEnumerable<Apartment> GetApartmentsByPropertyId(Guid propertyId);
        string CheckApartmentAvailibility(Guid apartmentId, DateTime requesterCheckin, DateTime requesterCheckout, 
            DateTime responderCheckin, DateTime responderCheckout, int persons);
        Apartment Create(Apartment Apartment);
        Apartment Update(Apartment Apartment);
        Apartment Delete(Apartment Apartment);
    }
}
