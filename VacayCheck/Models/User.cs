using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class User : BaseEntity
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string sex { get; set; }
        public DateTime birthDate { get; set; }
        public string bankAccount { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public bool isOwner { get; set; }
        public string profilePhoto { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public string country { get; set; }
        public string cityName { get; set; }
        public bool isMailVerificated { get; set; }
        public string cardHolderName { get; set; }

        public List<Property> property { get; set; }//one to many
        public List<Reservation> reservation { get; set; }
    }
}
