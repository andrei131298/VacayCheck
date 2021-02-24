using VacayCheck.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacayCheck.Mapper
{
    public static class UserMapper
    {
        public static User ToUser(AuthenticationRequest request)
        {
            return new User
            {
                email = request.email,
                password = request.password
            };
        }

        public static User ToUserExtension(this RegisterRequest request)
        {
            return new User
            {
                firstName = request.firstName,
                lastName = request.lastName,
                sex = request.sex,
                birthDate = request.birthDate,
                email = request.email,
                password = request.password
            };
        }
    }
}
