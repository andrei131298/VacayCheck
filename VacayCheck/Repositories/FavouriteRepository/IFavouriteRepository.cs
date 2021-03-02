using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.FavouriteRepository
{
    public interface IFavouriteRepository
    {
        List<Favourite> GetAll();
        Favourite GetByPropertyAndUser(Guid propertyId, Guid userId);
        Favourite Get(Guid id);
        IEnumerable<Favourite> GetByUser(Guid userId);
        Favourite Create(Favourite Favourite);
        Favourite Update(Favourite Favourite);
        Favourite Delete(Favourite Favourite);
    }
}