using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.CityRepository;


namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        public CityController(ICityRepository repository)
        {
            ICityRepository = repository;
        }
        public ICityRepository ICityRepository { get; set; }
        // GET: api/City
        [HttpGet]
        public ActionResult<IEnumerable<City>> Get()
        {
            return ICityRepository.GetAll();
        }

        // GET: api/City/5
        [HttpGet("{id}")]
        public ActionResult<City> Get(Guid id)
        {
            return ICityRepository.Get(id);
        }

        // POST: api/City
        [HttpPost]
        public City Post(CityDTO value)
        {
            City model = new City()
            {
                cityName = value.cityName
            };
            return ICityRepository.Create(model);
        }

        // PUT: api/City/5
        [HttpPut("{id}")]
        public City Put(Guid id, CityDTO value)
        {
            City model = ICityRepository.Get(id);
            if (value.cityName != null)
            {
                model.cityName = value.cityName;
            }

            return ICityRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public City Delete(Guid id)
        {
            City model = ICityRepository.Get(id);
            return ICityRepository.Delete(model);
        }
    }
}
