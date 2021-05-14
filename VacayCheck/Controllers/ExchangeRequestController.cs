using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacayCheck.DTOs;
using VacayCheck.Models;
using VacayCheck.Repositories.ExchangeRequestRepository;


namespace VacayCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExchangeRequestController : ControllerBase
    {
        public ExchangeRequestController(IExchangeRequestRepository repository)
        {
            IExchangeRequestRepository = repository;
        }
        public IExchangeRequestRepository IExchangeRequestRepository { get; set; }
        
        // GET: api/ExchangeRequest
        [HttpGet]
        public ActionResult<IEnumerable<ExchangeRequest>> Get()
        {
            return IExchangeRequestRepository.GetAll();
        }

        // GET: api/ExchangeRequest/5
        [HttpGet("{id}")]
        public ActionResult<ExchangeRequest> Get(Guid id)
        {
            return IExchangeRequestRepository.Get(id);
        }

        [HttpGet("requester/{requesterId}")]
        public IEnumerable<ExchangeRequestDTO> GetRequestsByRequester(Guid requesterId)
        {

            IEnumerable<ExchangeRequest> MyRequests = IExchangeRequestRepository.GetRequestsByRequester(requesterId);
            List<ExchangeRequestDTO> RequestsDTO = new List<ExchangeRequestDTO>();
            foreach (ExchangeRequest e in MyRequests)
            {
                ExchangeRequestDTO requestDTO = new ExchangeRequestDTO()
                {
                    id = e.id,
                    requesterId = e.requesterId,
                    responderId = e.responderId,
                    responderApartmentId = e.responderApartmentId,
                    requesterApartmentId = e.requesterApartmentId,
                    checkIn = e.checkIn,
                    checkOut = e.checkOut,
                    numberOfPersons = e.numberOfPersons,
                    status = e.status

                };
                RequestsDTO.Add(requestDTO);
            }
            return RequestsDTO;
        }

        [HttpGet("responder/{responderId}")]
        public IEnumerable<ExchangeRequestDTO> GetRequestsByResponder(Guid responderId)
        {

            IEnumerable<ExchangeRequest> MyRequests = IExchangeRequestRepository.GetRequestsByResponder(responderId);
            List<ExchangeRequestDTO> RequestsDTO = new List<ExchangeRequestDTO>();
            foreach (ExchangeRequest e in MyRequests)
            {
                ExchangeRequestDTO requestDTO = new ExchangeRequestDTO()
                {
                    id = e.id,
                    requesterId = e.requesterId,
                    responderId = e.responderId,
                    responderApartmentId = e.responderApartmentId,
                    requesterApartmentId = e.requesterApartmentId,
                    checkIn = e.checkIn,
                    checkOut = e.checkOut,
                    numberOfPersons = e.numberOfPersons,
                    status = e.status

                };
                RequestsDTO.Add(requestDTO);
            }
            return RequestsDTO;
        }

        // POST: api/ExchangeRequest
        [HttpPost]
        public ExchangeRequest Post(ExchangeRequestDTO value)
        {
            ExchangeRequest model = new ExchangeRequest()
            {
                requesterId = value.requesterId,
                responderId = value.responderId,
                requesterApartmentId = value.requesterApartmentId,
                responderApartmentId = value.responderApartmentId,
                checkIn = value.checkIn.ToLocalTime(),
                checkOut = value.checkOut.ToLocalTime(),
                numberOfPersons = value.numberOfPersons,
                status = "Pending"
            };
            return IExchangeRequestRepository.Create(model);
        }

        // PUT: api/ExchangeRequest/5
        [HttpPut("{id}")]
        public ExchangeRequest Put(Guid id, ExchangeRequestDTO value)
        {
            ExchangeRequest model = IExchangeRequestRepository.Get(id);
            if (value.requesterId != null)
            {
                model.requesterId = value.requesterId;
            }
            if (value.responderId != null)
            {
                model.responderId = value.responderId;
            }
            if (value.requesterApartmentId != null)
            {
                model.requesterApartmentId = value.requesterApartmentId;
            }
            if (value.responderApartmentId != null)
            {
                model.responderApartmentId = value.responderApartmentId;
            }
            if (value.checkIn != null)
            {
                model.checkIn = value.checkIn;
            }
            if (value.checkOut != null)
            {
                model.checkOut = value.checkOut;
            }
            if (value.numberOfPersons != 0)
            {
                model.numberOfPersons = value.numberOfPersons;
            }
            if (value.status != null)
            {
                model.status = value.status;
            }
            return IExchangeRequestRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ExchangeRequest Delete(Guid id)
        {
            ExchangeRequest model = IExchangeRequestRepository.Get(id);
            return IExchangeRequestRepository.Delete(model);
        }
    }
}
