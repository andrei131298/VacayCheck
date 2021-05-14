using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.UserRepository;
using VacayCheck.Repositories.ApartmentRepository;
using VacayCheck.Repositories.PropertyRepository;
using VacayCheck.Repositories.ReservationRepository;


namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserRepository repository, IApartmentRepository apRepository, IPropertyRepository propRepository,
            IReservationRepository resRepository)
        {
            IUserRepository = repository;
            IApartmentRepository = apRepository;
            IPropertyRepository = propRepository;
            IReservationRepository = resRepository;
        }
        public IUserRepository IUserRepository { get; set; }
        public IPropertyRepository IPropertyRepository { get; set; }
        public IApartmentRepository IApartmentRepository { get; set; }
        public IReservationRepository IReservationRepository { get; set; }

        // GET: api/User
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            return IUserRepository.GetAll();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public ActionResult<UserDTO> Get(Guid id)
        {
            User user = IUserRepository.Get(id);
            UserDTO userDTO = new UserDTO()
            {
                id = user.id,
                firstName = user.firstName,
                lastName = user.lastName,
                sex = user.sex,
                birthDate = user.birthDate,
                bankAccount = user.bankAccount,
                email = user.email,
                password = user.password,
                isOwner = user.isOwner,
                profilePhoto = user.profilePhoto,
                address = user.address,
                phoneNumber = user.phoneNumber,
                country = user.country,
                cityName = user.cityName,
                isMailVerificated = user.isMailVerificated

            };
            List<Reservation> allReservations = new List<Reservation>();
            IEnumerable<Property> myProperties = IPropertyRepository.GetPropertiesByUser(userDTO.id);
            foreach(Property p in myProperties)
            {
                IEnumerable<Apartment> myapartments = IApartmentRepository.GetApartmentsByPropertyId(p.id);
                foreach(Apartment ap in myapartments)
                {
                    IEnumerable<Reservation> myReservations = IReservationRepository.GetReservationsByApartment(ap.id);
                    allReservations.AddRange(myReservations.ToList());

                }
            }
            userDTO.userPropertiesReservations = allReservations;
            return userDTO;
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
            if (value.birthDate.ToLocalTime() != null)
            {
                model.birthDate = value.birthDate.ToLocalTime();
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
            if (value.profilePhoto != null)
            {
                model.profilePhoto = value.profilePhoto;
            }
            if (value.address != null)
            {
                model.address = value.address;
            }
            if (value.cityName != null)
            {
                model.cityName = value.cityName;
            }
            if (value.country != null)
            {
                model.country = value.country;
            }
            if (value.phoneNumber != null)
            {
                model.phoneNumber = value.phoneNumber;
            }
            if (value.isMailVerificated == true)
            {
                model.isMailVerificated = value.isMailVerificated;
            }
            if (value.isOwner == true)
            {
                model.isOwner = true;
            }
            if (value.isOwner == false)
            {
                model.isOwner = false;
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
