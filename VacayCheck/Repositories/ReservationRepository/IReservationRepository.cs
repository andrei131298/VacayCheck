using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;

namespace VacayCheck.Repositories.ReservationRepository
{
    public interface IReservationRepository
    {
        List<Reservation> GetAll();
        Reservation Get(int id);
        IEnumerable<Reservation> GetAlreadyReservedByDates(DateTime checkIn, DateTime checkOut);
        IEnumerable<Reservation> GetReservationsByUser(int userId);
        Reservation Create(Reservation Reservation);
        Reservation Update(Reservation Reservation);
        Reservation Delete(Reservation Reservation);
    }
}
