using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace VacayCheck.Models
{
    public class RegisterRequest
    {
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string sex { get; set; }
        [Required]
        public DateTime birthDate { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string phoneNumber { get; set; }
        [Required]
        public string country { get; set; }
        [Required]
        public Guid city { get; set; }
    }
}
