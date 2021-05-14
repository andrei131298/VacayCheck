using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.DTOs
{
    public class PropertyDTO : BaseEntity
    {

        public string name { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public int numberOfStars { get; set; }
        public string street { get; set; }
        public string country { get; set; }
        public string photo { get; set; }
        public string cityName { get; set; }
        public double mapLatitude { get; set; }
        public double mapLongitude { get; set; }
        public double averageRating { get; set; }

        public Guid userId { get; set; }
    }
}
