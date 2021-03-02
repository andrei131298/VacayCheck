using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.FavouriteRepository;
using VacayCheck.Repositories.UserRepository;
using VacayCheck.Repositories.PropertyRepository;



namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        public IFavouriteRepository IFavouriteRepository { get; set; }
        public IPropertyRepository IPropertyRepository { get; set; }
        public IUserRepository IUserRepository { get; set; }

        public FavouriteController(IFavouriteRepository repository, IPropertyRepository propertyrepository)
        {
            IFavouriteRepository = repository;
            IPropertyRepository = propertyrepository;
        }
        // GET: api/Favourite
        [HttpGet]
        public ActionResult<IEnumerable<Favourite>> Get()
        {
            return IFavouriteRepository.GetAll();
        }

        // GET: api/Favourite/5
        [HttpGet("{id}")]
        public ActionResult<Favourite> Get(Guid id)
        {
            return IFavouriteRepository.Get(id);
        }
        [HttpGet("user={userId}/property={propertyId}")]
        public Favourite GetByPropertyAndUser(Guid propertyId, Guid userId)
        {
            return IFavouriteRepository.GetByPropertyAndUser(propertyId,userId);
        }
        [HttpGet("user/{userId}")]
        public IEnumerable<FavouriteDTO> GetByUser(Guid userId)
        {
            
            IEnumerable<Favourite> MyFavourites = IFavouriteRepository.GetByUser(userId);
            List<FavouriteDTO> FavouritesDTO = new List<FavouriteDTO>();
            foreach (Favourite f in MyFavourites)
            {
                FavouriteDTO favouriteDTO = new FavouriteDTO()
                {
                    userId = f.userId,
                    propertyId = f.propertyId,

                };
                FavouritesDTO.Add(favouriteDTO);
            }
            foreach (FavouriteDTO fav in FavouritesDTO)
            {
                Property Property = IPropertyRepository.Get(fav.propertyId);
                fav.propertyName = Property.name;
            }
            return FavouritesDTO;
        }

        // POST: api/Favourite
        [HttpPost]
        public Favourite Post(FavouriteDTO value)
        {
            Favourite model = new Favourite()
            {
                propertyId = value.propertyId,
                userId = value.userId
            };
            return IFavouriteRepository.Create(model);
        }

        // PUT: api/Favourite/5
        [HttpPut("{id}")]
        public Favourite Put(Guid id, FavouriteDTO value)
        {
            Favourite model = IFavouriteRepository.Get(id);
            if (value.propertyId != null)
            {
                model.propertyId = value.propertyId;
            }
            if (value.userId != null)
            {
                model.userId = value.userId;
            }

            return IFavouriteRepository.Update(model);
        }

        // DELETE: api/Favourite/user={id}/property={id}
        [HttpDelete("user={userId}/property={propertyId}")]
        public Favourite Delete(Guid propertyId, Guid userId)
        {
            Favourite model = IFavouriteRepository.GetByPropertyAndUser(propertyId,userId);
            return IFavouriteRepository.Delete(model);
        }
    }
}
