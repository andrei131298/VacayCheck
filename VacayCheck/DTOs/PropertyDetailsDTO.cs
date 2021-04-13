using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.DTOs
{
    public class PropertyDetailsDTO
    {
        public string name { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public int numberOfStars { get; set; }
        public string street { get; set; }
        public int streetNumber { get; set; }
        public string country { get; set; }

        public Guid userId { get; set; }
        public string photo { get; set; }
        public List<String> cityName { get; set; }
        //public int ownerName { get; set; }
    }
}
