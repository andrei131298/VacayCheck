using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class ExchangeRequest : BaseEntity
    {
        public Guid requesterId { get; set; }
        public Guid responderId { get; set; }
        public Guid requesterApartmentId { get; set; }
        public Guid responderApartmentId { get; set; }
        public DateTime checkIn { get; set; }
        public DateTime checkOut { get; set; }
        public int numberOfPersons { get; set; }
        public string status { get; set; }
        
    }
}
