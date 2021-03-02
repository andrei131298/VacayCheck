using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Property : BaseEntity
    {
        public string name { get; set; }
        public string type { get; set; }
        public string description  { get; set; }
        public int numberOfStars { get; set; }
        public string street { get; set; }
        public int streetNumber { get; set; }
        public string photo { get; set; }
        public Guid cityId { get; set; }

        public Guid userId { get; set; }

        public virtual City city { get; set; }//many to one
        public virtual User user { get; set; }
        public List<Apartment> apartment { get; set; }//one to many
    }
}
