using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.UserRepository
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User Get(Guid id);
        User Update(User User);
        User Delete(User User);

        User Register(RegisterRequest request);

        bool forgotPassword(string email);
        AuthenticationResponse Login(AuthenticationRequest request);
    }
}