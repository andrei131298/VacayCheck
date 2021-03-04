using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.ApartmentRepository;
using VacayCheck.Repositories.PhotoRepository;




namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        public IApartmentRepository IApartmentRepository { get; set; }
        public IPhotoRepository IPhotoRepository { get; set; }
        public ApartmentController(IApartmentRepository apartmentrepository, IPhotoRepository photorepository)
        {
            IApartmentRepository = apartmentrepository;
            IPhotoRepository = photorepository;
        }
        // GET: api/Apartment
        [HttpGet]
        public ActionResult<IEnumerable<Apartment>> Get()
        {
            return IApartmentRepository.GetAll();
        }

        // GET: api/Apartment/5
        [HttpGet("{id}")]
        public ApartmentDTO Get(Guid id)
        {
            Apartment Apartment = IApartmentRepository.Get(id);
            ApartmentDTO MyApartments = new ApartmentDTO()
            {
                id = Apartment.id,
                apartmentName = Apartment.apartmentName,
                numberOfRooms = Apartment.numberOfRooms,
                description = Apartment.description,
                maxPersons = Apartment.maxPersons,
                pricePerNight = Apartment.pricePerNight,
                propertyId = Apartment.propertyId
            };
            IEnumerable<Photo> Photos = IPhotoRepository.GetAll().Where(x => x.apartmentId == Apartment.id);
            
            if (Photos != null)
            {
                List<string> PhotosPathsList = new List<string>();
                foreach (Photo Photo in Photos)
                {
                    PhotosPathsList.Add(Photo.path);
                }
                MyApartments.photos = PhotosPathsList;
            }
            
            return MyApartments;
        }

        [HttpGet("propertyId/{propertyId}")]
        public List<ApartmentDTO> GetApartmentsByPropertyId(Guid propertyId)
        {
            
                IEnumerable<Apartment> MyApartments = IApartmentRepository.GetApartmentsByPropertyId(propertyId);
                List<ApartmentDTO> ApartmentsDTO = new List<ApartmentDTO>();
                foreach (Apartment ap in MyApartments)
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

        // POST: api/Apartment
        [HttpPost]
        public Apartment Post(ApartmentDTO value)
        {
            Apartment model = new Apartment()
            {
                apartmentName = value.apartmentName,
                numberOfRooms = value.numberOfRooms,
                description = value.description,
                pricePerNight = value.pricePerNight,
                maxPersons = value.maxPersons,
                propertyId = value.propertyId

            };
            IApartmentRepository.Create(model);
            return model;
        }

        // PUT: api/Apartment/5
        [HttpPut("{id}")]
        public Apartment Put(Guid id, ApartmentDTO value)
        {
            Apartment model = IApartmentRepository.Get(id);
            if (value.description != null)
            {
                model.description = value.description;
            }
            if (value.numberOfRooms != 0)
            {
                model.numberOfRooms = value.numberOfRooms;
            }
            if (value.propertyId != null)
            {
                model.propertyId = value.propertyId;
            }
            if (value.pricePerNight != 0)
            {
                model.pricePerNight = value.pricePerNight;
            }
            return IApartmentRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Apartment Delete(Guid id)
        {
            Apartment model = IApartmentRepository.Get(id);
            return IApartmentRepository.Delete(model);
        }
    }
}
