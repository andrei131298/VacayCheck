using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.DTOs
{
    public class ReservationDTO : BaseEntity
    {
        public DateTime checkIn { get; set; }
        public DateTime checkOut { get; set; }
        public int price { get; set; }
        public string review { get; set; }
        public Guid userId { get; set; }
        public Guid apartmentId { get; set; }
        public string apartmentName { get; set; }
        public string propertyName { get; set; }
        public Guid propertyId { get; set; }
        public int numberOfPersons { get; set; }
        public bool paidWithCard { get; set; }
        public int rating { get; set; }




    }
}
