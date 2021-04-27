using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;
using VacayCheck.Contexts;

namespace VacayCheck.Repositories.ExchangeRequestRepository
{
        public class ExchangeRequestRepository : IExchangeRequestRepository
        {
            public Context _context { get; set; }
            public ExchangeRequestRepository(Context context)
            {
                _context = context;
            }
            public ExchangeRequest Create(ExchangeRequest ExchangeRequest)
            {
                var result = _context.Add<ExchangeRequest>(ExchangeRequest);
                _context.SaveChanges();
                return result.Entity;
            }
            public ExchangeRequest Get(Guid Id)
            {
                return _context.ExchangeRequests.SingleOrDefault(x => x.id == Id);
            }
            public IEnumerable<ExchangeRequest> GetRequestsByRequester(Guid requesterId)
            {
                return _context.ExchangeRequests.ToList().Where(req => req.requesterId == requesterId);
            }
            public IEnumerable<ExchangeRequest> GetRequestsByResponder(Guid responderId)
            {
                return _context.ExchangeRequests.ToList().Where(req => req.responderId == responderId);
            }

        public List<ExchangeRequest> GetAll()
            {
                return _context.ExchangeRequests.ToList();
            }

            public ExchangeRequest Update(ExchangeRequest ExchangeRequest)
            {
                _context.Entry(ExchangeRequest).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
                return ExchangeRequest;
            }

            public ExchangeRequest Delete(ExchangeRequest ExchangeRequest)
            {
                var result = _context.Remove(ExchangeRequest);
                _context.SaveChanges();
                return result.Entity;
            }
        }

}
