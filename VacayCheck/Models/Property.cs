using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class Property
    {
        public int id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string description  { get; set; }
        public int numberOfStars { get; set; }
        public string street { get; set; }
        public int streetNumber { get; set; }
        public string photo { get; set; }
        public int cityId { get; set; }

        public int userId { get; set; }

        public virtual City city { get; set; }//many to one
        public virtual User user { get; set; }
        public List<Apartment> apartment { get; set; }//one to many
    }
}
