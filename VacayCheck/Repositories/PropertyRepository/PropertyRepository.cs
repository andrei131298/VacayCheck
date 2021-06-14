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
        public IEnumerable<Property> GetAvailableProperties(string searchText, DateTime checkin, DateTime checkout, int persons)
        {
            IEnumerable<Property> searchedProperties = _context.Properties.ToList().Where(p => p.cityName.ToLower().Contains(searchText.ToLower()));
            List<Property> availableProperties = new List<Property>(); 
            foreach (Property property in searchedProperties)
            {

                IEnumerable<Apartment> apartments = _context.Apartments.ToList().Where(ap => ap.propertyId == property.id);
                foreach(Apartment apartment in apartments)
                {
                    if(apartment.maxPersons >= persons)
                    {
                        IEnumerable<Reservation> reservations = _context.Reservations.ToList().Where(res => res.apartmentId == apartment.id);
                        Reservation overlayedReservation = null; 
                        foreach (Reservation reservation in reservations)
                        {
                            if (checkin >= reservation.checkIn && checkin < reservation.checkOut ||
                                checkout > reservation.checkIn && checkout <= reservation.checkOut ||
                                checkin <= reservation.checkIn && checkout >= reservation.checkOut)
                            {
                                overlayedReservation = reservation;
                                break;
                            }
                        }
                        if(overlayedReservation == null)
                        {
                            availableProperties.Add(property);
                            break;
                        }
                    }
                    
                }
            }
            return availableProperties;
        }

        public IEnumerable<Apartment> GetAvailableApartments(Guid propertyId, DateTime checkin, DateTime checkout, int persons)
        {
            List<Apartment> availableApartments = new List<Apartment>();
            IEnumerable<Apartment> apartments = _context.Apartments.ToList().Where(ap => ap.propertyId == propertyId);
            foreach (Apartment apartment in apartments)
            {
                if (apartment.maxPersons >= persons)
                {
                    IEnumerable<Reservation> reservations = _context.Reservations.ToList().Where(res => res.apartmentId == apartment.id);
                    Reservation overlayedReservation = null;
                    foreach (Reservation reservation in reservations)
                    {
                        if (checkin >= reservation.checkIn && checkin < reservation.checkOut ||
                            checkout > reservation.checkIn && checkout <= reservation.checkOut ||
                            checkin <= reservation.checkIn && checkout >= reservation.checkOut)
                        {
                            overlayedReservation = reservation;
                            break;
                        }
                    }
                    if (overlayedReservation == null)
                    {
                        availableApartments.Add(apartment);
                    }
                }

            }
            return availableApartments;
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

