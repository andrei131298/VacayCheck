using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.PhotoRepository;


namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        public PhotoController(IPhotoRepository repository)
        {
            IPhotoRepository = repository;
        }
        public IPhotoRepository IPhotoRepository { get; set; }
        // GET: api/Photo
        [HttpGet]
        public ActionResult<IEnumerable<Photo>> Get()
        {
            return IPhotoRepository.GetAll();
        }

        // GET: api/Photo/5
        [HttpGet("{id}")]
        public ActionResult<Photo> Get(Guid id)
        {
            return IPhotoRepository.Get(id);
        }

        // POST: api/Photo
        [HttpPost]
        public Photo Post(PhotoDTO value)
        {
            Photo model = new Photo()
            {
                apartmentId = value.apartmentId,
                path = value.path
            };
            return IPhotoRepository.Create(model);
        }

        // PUT: api/Photo/5
        [HttpPut("{id}")]
        public Photo Put(Guid id, PhotoDTO value)
        {
            Photo model = IPhotoRepository.Get(id);
            if (value.path != null)
            {
                model.path = value.path;
            }
            if (value.apartmentId != null)
            {
                model.apartmentId = value.apartmentId;
            }

            return IPhotoRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Photo Delete(Guid id)
        {
            Photo model = IPhotoRepository.Get(id);
            return IPhotoRepository.Delete(model);
        }
    }
}
