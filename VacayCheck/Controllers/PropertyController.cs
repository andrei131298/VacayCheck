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
using VacayCheck.Repositories.ApartmentRepository;
using VacayCheck.Repositories.ReservationRepository;
using VacayCheck.Repositories.PhotoRepository;


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
        public IPhotoRepository IPhotoRepository { get; set; }

        public PropertyController(IPropertyRepository propertyrepository, ICityRepository cityrepository, IUserRepository userrepository, 
            IApartmentRepository apartmentrepository, IReservationRepository reservationrepository, IPhotoRepository photoRepository)
        {
            IPropertyRepository = propertyrepository;
            ICityRepository = cityrepository;
            IUserRepository = userrepository;
            IApartmentRepository = apartmentrepository;
            IReservationRepository = reservationrepository;
            IPhotoRepository = photoRepository;

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
                    id = p.id,
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
                    mapLongitude = p.mapLongitude,
                    isPublic = p.isPublic

                };
                int numberOfReservations = 0;
                int allRatings = 0;

                IEnumerable<Apartment> apartments = IApartmentRepository.GetAll().Where(x => x.propertyId == p.id);
                foreach (Apartment ap in apartments)
                {
                    IEnumerable<Reservation> reservations = IReservationRepository.GetAll().Where(x => x.apartmentId == ap.id);
                    foreach (Reservation res in reservations)
                    {
                        if(res.rating != 0)
                        {
                            allRatings += res.rating;
                            numberOfReservations++;
                        }
                        
                    }
                }
                if(numberOfReservations != 0)
                {
                    MyProperty.averageRating = allRatings / numberOfReservations;

                }
                PropertiesDTO.Add(MyProperty);
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
                mapLongitude = Property.mapLongitude,
                isPublic = Property.isPublic
            };

            int numberOfReservations = 0;
            int allRatings = 0;

            IEnumerable<Apartment> apartments = IApartmentRepository.GetAll().Where(x => x.propertyId == MyProperty.id);
            foreach (Apartment ap in apartments)
            {
                IEnumerable<Reservation> reservations = IReservationRepository.GetAll().Where(x => x.apartmentId == ap.id);
                foreach (Reservation res in reservations)
                {
                    if (res.rating != 0)
                    {
                        allRatings += res.rating;
                        numberOfReservations++;
                    }

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
                    mapLongitude = p.mapLongitude,
                    isPublic = p.isPublic

                };
                
                PropertiesDTO.Add(propertyDTO);
            }
            
            return PropertiesDTO;
        }

        [HttpGet("GetAvailableProperties/{searchText}/{checkin}/{checkout}/{persons}")]
        public IEnumerable<PropertyDTO> GetAvailableProperties(string searchText, DateTime checkin, DateTime checkout, int persons)
        {

            IEnumerable<Property> availableProperties = IPropertyRepository.GetAvailableProperties(searchText, checkin, checkout, persons);
            List<PropertyDTO> PropertiesDTO = new List<PropertyDTO>();
            foreach (Property p in availableProperties)
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
                    mapLongitude = p.mapLongitude,
                    isPublic = p.isPublic
                };
                if(propertyDTO.isPublic == true)
                {
                    int numberOfReservations = 0;
                    int allRatings = 0;
                    List<Apartment> apartments = IApartmentRepository.GetAll().Where(x => x.propertyId == propertyDTO.id).ToList();
                    int minimumPrice = apartments[0].pricePerNight;

                    foreach (Apartment ap in apartments)
                    {
                        if (ap.pricePerNight < minimumPrice)
                        {
                            minimumPrice = ap.pricePerNight;
                        }
                        IEnumerable<Reservation> reservations = IReservationRepository.GetAll().Where(x => x.apartmentId == ap.id);
                        foreach (Reservation res in reservations)
                        {
                            if (res.rating != 0)
                            {
                                allRatings += res.rating;
                                numberOfReservations++;
                            }

                        }
                    }
                    if (minimumPrice != 0)
                    {
                        propertyDTO.startingPrice = minimumPrice;
                    }
                    if (numberOfReservations != 0)
                    {
                        propertyDTO.averageRating = allRatings / numberOfReservations;

                    }
                    PropertiesDTO.Add(propertyDTO);
                }
                
            }

            return PropertiesDTO;
        }

        [HttpGet("GetAvailableApartments/{propertyId}/{checkin}/{checkout}/{persons}")]
        public List<ApartmentDTO> GetAvailableApartments(Guid propertyId, DateTime checkin, DateTime checkout, int persons)
        {

            IEnumerable<Apartment> availableApartments = IPropertyRepository.GetAvailableApartments(propertyId, checkin, checkout, persons);
            List<ApartmentDTO> ApartmentsDTO = new List<ApartmentDTO>();
            foreach (Apartment ap in availableApartments)
            {
                IEnumerable<Photo> Photos = IPhotoRepository.GetAll().Where(x => x.apartmentId == ap.id);
                if (Photos != null)
                {
                    List<string> PhotosPathsList = new List<string>();
                    foreach (Photo Photo in Photos)
                    {
                        PhotosPathsList.Add(Photo.path);
                    }
                    ApartmentDTO apartmentDTO = new ApartmentDTO()
                    {
                        id = ap.id,
                        apartmentName = ap.apartmentName,
                        numberOfRooms = ap.numberOfRooms,
                        description = ap.description,
                        pricePerNight = ap.pricePerNight,
                        maxPersons = ap.maxPersons,
                        propertyId = ap.propertyId,
                        photos = PhotosPathsList
                    };
                    ApartmentsDTO.Add(apartmentDTO);
                }
            }
            return ApartmentsDTO;
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

        [HttpPut("changeAvailability/{id}")]
        public Property PutAvailability(Guid id, PropertyDTO value)
        {
            Property model = IPropertyRepository.Get(id);
            
            model.isPublic = value.isPublic;
            
            return IPropertyRepository.Update(model);
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
