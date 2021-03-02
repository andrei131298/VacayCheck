using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.DTOs
{
    public class FavouriteDTO
    {
        public Guid propertyId { get; set; }
        public Guid userId { get; set; }
        public string propertyName { get; set; }
    }
}
