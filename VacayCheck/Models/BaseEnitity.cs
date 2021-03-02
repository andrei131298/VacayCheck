using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class BaseEntity
    {
        [Key]
        public Guid id { get; set; }
    }
}
