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
        Favourite GetByPropertyAndUser(int propertyId, int userId);
        Favourite Get(int id);
        IEnumerable<Favourite> GetByUser(int userId);
        Favourite Create(Favourite Favourite);
        Favourite Update(Favourite Favourite);
        Favourite Delete(Favourite Favourite);
    }
}