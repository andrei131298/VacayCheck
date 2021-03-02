using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class AuthenticationResponse
    {
        public Guid id { get; set; }

        public string token { get; set; }
        public string email { get; set; }
    }
}
