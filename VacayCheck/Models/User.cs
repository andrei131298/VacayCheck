﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Models
{
    public class User
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string sex { get; set; }
        public DateTime birthDate { get; set; }
        public string bankAccount { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public bool isOwner { get; set; }
        public List<Property> property { get; set; }//one to many
        public List<Reservation> reservation { get; set; }//one to many
    }
}
