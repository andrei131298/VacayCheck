using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.DTOs
{
    public class ApartmentDTO
    {
        public int id { get; set; }
        public string apartmentName { get; set; }
        public int numberOfRooms { get; set; }
        public string description { get; set; }
        public int pricePerNight { get; set; }
        public int maxPersons { get; set; }
        public int propertyId { get; set; }
        public List<String> photos { get; set; }

    }
}
