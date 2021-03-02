using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Photo : BaseEntity
    {
        public Guid apartmentId { get; set; }
        public string path { get; set; }
        public virtual Apartment apartment { get; set; }
    }
}
