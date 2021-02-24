using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Reservation
    {
        public int id { get; set; }
        public int price { get; set; }
        public string review { get; set; }
        public int userId { get; set; }
        public DateTime checkIn { get; set; }
        public DateTime checkOut { get; set; }
        public int apartmentId { get; set; }
        public int numberOfPersons { get; set; }
        public virtual Apartment apartment { get; set; }//many to one
        public virtual User user { get; set; }
    }
}
