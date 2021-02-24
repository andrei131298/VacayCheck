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
        User Get(int id);
        User Update(User User);
        User Delete(User User);

        User Register(RegisterRequest request);
        AuthenticationResponse Login(AuthenticationRequest request);
    }
}