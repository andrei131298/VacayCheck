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
        public Apartment Get(Guid Id)
        {
            return _context.Apartments.SingleOrDefault(x => x.id == Id);
        }
        public IEnumerable<Apartment> GetApartmentsByPropertyId(Guid propertyId)
        {
            return _context.Apartments.ToList().Where(ap => ap.propertyId == propertyId);
        }
        public List<Apartment> GetAll()
        {
            return _context.Apartments.ToList();
        }

        public string CheckApartmentAvailibility(Guid apartmentId, DateTime requesterCheckin, DateTime requesterCheckout,
            DateTime responderCheckin, DateTime responderCheckout, int persons)
        {
            Apartment ap = _context.Apartments.SingleOrDefault(x => x.id == apartmentId);
            if(ap.maxPersons < persons)
            {
                return "Not available";
            }
            List<Reservation> apartmentReservations = _context.Reservations.ToList().Where(res => res.apartmentId == apartmentId).ToList();
            string availability = "";
            if (requesterCheckin >= responderCheckin && requesterCheckin < responderCheckout ||
                   requesterCheckout > responderCheckin && requesterCheckout <= responderCheckout ||
                   requesterCheckin <= responderCheckin && requesterCheckout >= responderCheckout)
            {
                return availability = "Overlayed";
            }

            foreach (Reservation reservation in apartmentReservations)
            {
                if(responderCheckin >= reservation.checkIn && responderCheckin < reservation.checkOut ||
                   responderCheckout > reservation.checkIn && responderCheckout <= reservation.checkOut ||
                   responderCheckin <= reservation.checkIn && responderCheckout >= reservation.checkOut)
                {
                    return availability = "Not available";
                }
            }
            availability = "Available";
            return availability;
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

