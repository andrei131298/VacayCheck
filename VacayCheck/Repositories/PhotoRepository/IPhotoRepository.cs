using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.PhotoRepository
{
    public interface IPhotoRepository
    {
        List<Photo> GetAll();
        Photo Get(Guid id);
        Photo Create(Photo Photo);
        Photo Update(Photo Photo);
        Photo Delete(Photo Photo);
    }
}
