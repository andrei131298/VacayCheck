using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Apartment
    {
        public int id { get; set; }
        public string apartmentName { get; set; }
        public int numberOfRooms { get; set; }
        public int pricePerNight { get; set; }
        public int maxPersons { get; set; }
        public string description { get; set; }
        public int propertyId { get; set; }
        public virtual Property property { get; set; }//many to one
        public List<Reservation> reservation { get; set; }

    }
}
