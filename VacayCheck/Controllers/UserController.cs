using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.UserRepository;


namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserRepository repository)
        {
            IUserRepository = repository;
        }
        public IUserRepository IUserRepository { get; set; }
        // GET: api/User
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            return IUserRepository.GetAll();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(Guid id)
        {
            return IUserRepository.Get(id);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public User Put(Guid id, UserDTO value)
        {
            User model = IUserRepository.Get(id);
            if (value.firstName != null)
            {
                model.firstName = value.firstName;
            }
            if (value.lastName != null)
            {
                model.lastName = value.lastName;
            }
            if (value.sex != null)
            {
                model.sex = value.sex;
            }
            if (value.birthDate != null)
            {
                model.birthDate = value.birthDate;
            }
            if (value.bankAccount != null)
            {
                model.bankAccount = value.bankAccount;
            }
            if (value.email != null)
            {
                model.email = value.email;
            }
            if (value.password != null)
            {
                model.password = value.password;
            }
            return IUserRepository.Update(model);
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest regRequest)
        {
            return Ok(IUserRepository.Register(regRequest));
        }

        [HttpPost("login")]
        public IActionResult Login(AuthenticationRequest request)
        {
            return Ok(IUserRepository.Login(request));
        }
      
        [HttpDelete("{id}")]
        public User Delete(Guid id)
        {
            User model = IUserRepository.Get(id);
            return IUserRepository.Delete(model);
        }
    }
}
