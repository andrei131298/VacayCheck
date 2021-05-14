﻿using System;
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
using VacayCheck.Repositories.ApartmentRepository;
using VacayCheck.Repositories.ReservationRepository;

namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        public IPropertyRepository IPropertyRepository { get; set; }
        public ICityRepository ICityRepository { get; set; }
        public IUserRepository IUserRepository { get; set; }
        public IApartmentRepository IApartmentRepository { get; set; }
        public IReservationRepository IReservationRepository { get; set; }

        public PropertyController(IPropertyRepository propertyrepository, ICityRepository cityrepository, IUserRepository userrepository, 
            IApartmentRepository apartmentrepository, IReservationRepository reservationrepository)
        {
            IPropertyRepository = propertyrepository;
            ICityRepository = cityrepository;
            IUserRepository = userrepository;
            IApartmentRepository = apartmentrepository;
            IReservationRepository = reservationrepository;

        }
        // GET: api/Property
        [HttpGet]
        public List<PropertyDetailsDTO> Get()
        {

            List<Property> AllProperties = IPropertyRepository.GetAll();
            List<PropertyDetailsDTO> PropertiesDTO = new List<PropertyDetailsDTO>();
            foreach (Property p in AllProperties)
            {
                PropertyDetailsDTO MyProperty = new PropertyDetailsDTO()
                {
                    name = p.name,
                    type = p.type,
                    description = p.description,
                    numberOfStars = p.numberOfStars,
                    street = p.street,
                    country = p.country,
                    cityName = p.cityName,
                    userId = p.userId,
                    photo = p.photo,
                    mapLatitude = p.mapLatitude,
                    mapLongitude = p.mapLongitude
                };
                PropertiesDTO.Add(MyProperty);
                int numberOfReservations = 0;
                int allRatings = 0;

                IEnumerable<Apartment> apartments = IApartmentRepository.GetAll().Where(x => x.propertyId == p.id);
                foreach (Apartment ap in apartments)
                {
                    IEnumerable<Reservation> reservations = IReservationRepository.GetAll().Where(x => x.apartmentId == ap.id);
                    foreach (Reservation res in reservations)
                    {
                        allRatings += res.rating;
                        numberOfReservations++;
                    }
                }
                if(numberOfReservations != 0)
                {
                    MyProperty.averageRating = allRatings / numberOfReservations;

                }
            }

            return PropertiesDTO;
        }

        // GET: api/Property/5
        [HttpGet("{id}")]
        public PropertyDetailsDTO Get(Guid id)
        {
            Property Property = IPropertyRepository.Get(id);
            PropertyDetailsDTO MyProperty = new PropertyDetailsDTO()
            {
                id = Property.id,
                name = Property.name,
                type = Property.type,
                description = Property.description,
                numberOfStars = Property.numberOfStars,
                street = Property.street,
                country = Property.country,
                cityName = Property.cityName,
                userId = Property.userId,
                photo = Property.photo,
                mapLatitude = Property.mapLatitude,
                mapLongitude = Property.mapLongitude
            };

            int numberOfReservations = 0;
            int allRatings = 0;

            IEnumerable<Apartment> apartments = IApartmentRepository.GetAll().Where(x => x.propertyId == MyProperty.id);
            foreach (Apartment ap in apartments)
            {
                IEnumerable<Reservation> reservations = IReservationRepository.GetAll().Where(x => x.apartmentId == ap.id);
                foreach (Reservation res in reservations)
                {
                    allRatings += res.rating;
                    numberOfReservations++;
                }
            }
            if (numberOfReservations != 0)
            {
                MyProperty.averageRating = allRatings / numberOfReservations;

            }
            return MyProperty;
        }
        [HttpGet("GetPropertiesByUser/{userId}")]
        public IEnumerable<PropertyDTO> GetPropertiesByUser(Guid userId)
        {

            IEnumerable<Property> MyProperties = IPropertyRepository.GetPropertiesByUser(userId);
            List<PropertyDTO> PropertiesDTO = new List<PropertyDTO>();
            foreach (Property p in MyProperties)
            {
                PropertyDTO propertyDTO = new PropertyDTO()
                {
                    id = p.id,
                    cityName = p.cityName,
                    name = p.name,
                    type = p.type,
                    description = p.description,
                    numberOfStars = p.numberOfStars,
                    street = p.street,
                    photo = p.photo,
                    userId = p.userId,
                    mapLatitude = p.mapLatitude,
                    mapLongitude = p.mapLongitude
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
                photo = value.photo,
                cityName = value.cityName,
                userId = value.userId,
                mapLatitude = value.mapLatitude,
                mapLongitude = value.mapLongitude,
                country = value.country
            };
            IPropertyRepository.Create(model);
            return model;
        }

        // PUT: api/Property/5
        [HttpPut("{id}")]
        public Property Put(Guid id, PropertyDTO value)
        {
            Property model = IPropertyRepository.Get(id);
            if (value.name != null)
            {
                model.name = value.name;
            }
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
            if (value.cityName != null)
            {
                model.cityName = value.cityName;
            }
            if (value.country != null)
            {
                model.country = value.country;
            }
            if (value.mapLatitude != null)
            {
                model.mapLatitude = value.mapLatitude;
            }
            if (value.mapLongitude != null)
            {
                model.mapLongitude = value.mapLongitude;
            }
            if (value.photo != null)
            {
                model.photo = value.photo;
            }

            return IPropertyRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Property Delete(Guid id)
        {
            Property model = IPropertyRepository.Get(id);
            return IPropertyRepository.Delete(model);
        }
    }
}
