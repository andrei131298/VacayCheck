using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;


namespace VacayCheck.Repositories.ExchangeRequestRepository
{
    public interface IExchangeRequestRepository
    {
        List<ExchangeRequest> GetAll();
        ExchangeRequest Get(Guid id);
        IEnumerable<ExchangeRequest> GetRequestsByRequester(Guid requesterId);
        IEnumerable<ExchangeRequest> GetRequestsByResponder(Guid responderId);

        ExchangeRequest Create(ExchangeRequest ExchangeRequest);
        ExchangeRequest Update(ExchangeRequest ExchangeRequest);
        ExchangeRequest Delete(ExchangeRequest ExchangeRequest);
    }
}
