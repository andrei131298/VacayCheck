using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Favourite
    {
        public int id { get; set; }
        public int propertyId { get; set; }
        public int userId { get; set; }
        public virtual Property property { get; set; }
        public virtual User user { get; set; }
    }
}
