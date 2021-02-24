using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.PropertyRepository;
using VacayCheck.Repositories.CityRepository;
using VacayCheck.Repositories.OwnerRepository;
using VacayCheck.Repositories.UserRepository;


namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        public IPropertyRepository IPropertyRepository { get; set; }
        public ICityRepository ICityRepository { get; set; }
        public IOwnerRepository IOwnerRepository { get; set; }
        public IUserRepository IUserRepository { get; set; }
        public PropertyController(IPropertyRepository propertyrepository, ICityRepository cityrepository, IUserRepository userrepository)
        {
            IPropertyRepository = propertyrepository;
            ICityRepository = cityrepository;
            IUserRepository = userrepository;

        }
        // GET: api/Property
        [HttpGet]
        public ActionResult<IEnumerable<Property>> Get()
        {
            return IPropertyRepository.GetAll();
        }

        // GET: api/Property/5
        [HttpGet("{id}")]
        public PropertyDetailsDTO Get(int id)
        {
            Property Property = IPropertyRepository.Get(id);
            PropertyDetailsDTO MyProperties = new PropertyDetailsDTO()
            {
                name = Property.name,
                type = Property.type,
                description = Property.description,
                numberOfStars = Property.numberOfStars,
                street = Property.street,
                streetNumber = Property.streetNumber,
                photo = Property.photo
            };
            IEnumerable<City> Cities = ICityRepository.GetAll().Where(x => x.id == Property.cityId);
            if (Cities != null)
            {
                List<string> CityNameList = new List<string>();
                foreach (City City in Cities)
                {
                    CityNameList.Add(City.cityName);
                }
                MyProperties.cityName = CityNameList;
            }
            IEnumerable<Owner> Owners = IOwnerRepository.GetAll().Where(x => x.id == Property.userId);
            if (Owners != null)
            {
                List<string> OwnerNameList = new List<string>();
                foreach (Owner Owner in Owners)
                {
                    OwnerNameList.Add(Owner.lastName);
                }
                MyProperties.ownerName = OwnerNameList;
            }
            return MyProperties;
        }
        [HttpGet("GetPropertiesByUser/{userId}")]
        public IEnumerable<PropertyDTO> GetPropertiesByUser(int userId)
        {

            IEnumerable<Property> MyProperties = IPropertyRepository.GetPropertiesByUser(userId);
            List<PropertyDTO> PropertiesDTO = new List<PropertyDTO>();
            foreach (Property p in MyProperties)
            {
                PropertyDTO propertyDTO = new PropertyDTO()
                {
                    name = p.name,
                    type = p.type,
                    description = p.description,
                    numberOfStars = p.numberOfStars,
                    street = p.street,
                    streetNumber = p.streetNumber,
                    photo = p.photo

                };
                PropertiesDTO.Add(propertyDTO);
            }
            
            return PropertiesDTO;
        }

        // POST: api/Property
        [HttpPost]
        public Property Post(PropertyDTO value)
        {
            Property model = new Property()
            {
                name = value.name,
                type = value.type,
                description = value.description,
                //numberOfStars = value.numberOfStars,
                street = value.street,
                streetNumber = value.streetNumber,
                photo = value.photo,
                cityId = value.cityId,
                userId = value.userId
            };
            return IPropertyRepository.Create(model);
        }

        // PUT: api/Property/5
        [HttpPut("{id}")]
        public Property Put(int id, PropertyDTO value)
        {
            Property model = IPropertyRepository.Get(id);
            if (value.type != null)
            {
                model.type = value.type;
            }
            if (value.description != null)
            {
                model.description = value.description;
            }
            if (value.numberOfStars != 0)
            {
                model.numberOfStars = value.numberOfStars;
            }
            if (value.street != null)
            {
                model.street = value.street;
            }
            if (value.streetNumber != 0)
            {
                model.streetNumber = value.streetNumber;
            }
            if (value.photo != null)
            {
                model.photo = value.photo;
            }

            return IPropertyRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Property Delete(int id)
        {
            Property model = IPropertyRepository.Get(id);
            return IPropertyRepository.Delete(model);
        }
    }
}
