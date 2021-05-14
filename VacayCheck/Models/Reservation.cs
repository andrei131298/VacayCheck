using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Reservation : BaseEntity
    {
        public int price { get; set; }
        public string review { get; set; }
        public Guid userId { get; set; }
        public DateTime checkIn { get; set; }
        public DateTime checkOut { get; set; }
        public Guid apartmentId { get; set; }
        public int numberOfPersons { get; set; }
        public bool paidWithCard { get; set; }
        public int rating { get; set; }
        public virtual Apartment apartment { get; set; }//many to one
        public virtual User user { get; set; }
    }
}
