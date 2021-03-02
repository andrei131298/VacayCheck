using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.OwnerRepository
{
    public interface IOwnerRepository
    {
        List<Owner> GetAll();
        Owner Get(Guid id);
        Owner Create(Owner Owner);
        Owner Update(Owner Owner);
        Owner Delete(Owner Owner);
    }
}
