using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.DTOs
{
    public class ReservationDTO
    {
        public int id { get; set; }
        public DateTime checkIn { get; set; }
        public DateTime checkOut { get; set; }
        public int price { get; set; }
        public string review { get; set; }
        public int userId { get; set; }
        public int apartmentId { get; set; }
        public string apartmentName { get; set; }
        public string propertyName { get; set; }
        public int propertyId { get; set; }
        public int numberOfPersons { get; set; }



    }
}
