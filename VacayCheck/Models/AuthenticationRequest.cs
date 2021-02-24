using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class AuthenticationRequest
    {
        [Required]
        public string email { get; set; }
        public string password { get; set; }
    }
}
