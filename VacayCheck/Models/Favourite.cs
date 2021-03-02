using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Favourite : BaseEntity
    {
        public Guid propertyId { get; set; }
        public Guid userId { get; set; }
        public virtual Property property { get; set; }
        public virtual User user { get; set; }
    }
}
