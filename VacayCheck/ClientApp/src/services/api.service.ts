import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Property } from "../app/shared/property.model";
import { City } from "../app/shared/city.model";
import { Apartment } from "../app/shared/apartment.model";
import { Favourite } from "../app/shared/favourite.model";
import { Reservation } from "../app/shared/reservation.model";
import { User } from "../app/shared/user.model";
import { Owner } from "../app/shared/owner.model";
import { LoginRequest } from "../app/shared/loginRequest";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    "Content-Type": "application/json",
  });
  baseUrl = "https://localhost:44397/api";

  getCity(id: string) {
    return this.http.get(this.baseUrl + "/City/" + id.toString(), {
      headers: this.header,
    });
  }

  getLoginToken(loginRequest: LoginRequest) {
    return this.http.post(this.baseUrl + "/User/login", loginRequest, {
        headers: this.header, observe: 'response',
    });
}
  getFavouriteByUserAndProperty(userId: string,propertyId:string){
    return this.http.get(this.baseUrl + "/Favourite/user=" + userId + "/property="+ propertyId, {
      headers: this.header,
    });
  }

  getApartment(id: string) {
    return this.http.get(this.baseUrl + "/Apartment/" + id.toString());
  }

  getFavouritesByUser(userId: string) {
    return this.http.get(this.baseUrl + "/Favourite/user/" + userId.toString(), {
      headers: this.header,
    });
  }
  getOwner(id: string) {
    return this.http.get(this.baseUrl + "/Owner/" + id.toString(), {
      headers: this.header,
    });
  }
  getUser(id: string) {
    return this.http.get(this.baseUrl + "/User/" + id.toString(), {
      headers: this.header,
    });
  }
  getProperty(id: string) {
    return this.http.get(this.baseUrl + "/Property/" + id.toString(), {
      headers: this.header,
    });
  }
  getReservation(id: string) {
    return this.http.get(this.baseUrl + "/Reservation/" + id.toString(), {
      headers: this.header,
    });
  }
  getAlreadyReservedByDates(checkIn:string,checkOut:string){
    return this.http.get(this.baseUrl + "/Reservation/dates?checkIn=" + checkIn.toString() + "&checkOut=" + checkOut.toString(), {
      headers: this.header,
    });
  }
  getReservationsByUser(userId:string){
    return this.http.get(this.baseUrl + "/Reservation/user/" + userId.toString(), {
      headers: this.header,
    });
  }
  getPropertiesByUser(userId:string){
    return this.http.get(this.baseUrl + "/Property/GetPropertiesByUser/" + userId.toString(), {
      headers: this.header,
    });
  }
  getUsers() {
    return this.http.get(this.baseUrl + "/User/register", { headers: this.header });
  }
  getProperties() {
    return this.http.get(this.baseUrl + "/Property", { headers: this.header });
  }
  getApartments() {
    return this.http.get(this.baseUrl + "/Apartment", { headers: this.header });
  }
  getApartmentsByPropertyId(propertyId:string) {
    return this.http.get(this.baseUrl + "/Apartment/propertyId/" + propertyId.toString(), {
      headers: this.header,
    });  
  }
  getCities() {
    return this.http.get(this.baseUrl + "/City", { headers: this.header });
  }
  getReservations() {
    return this.http.get(this.baseUrl + "/Reservation", {
      headers: this.header,
    });
  }
  addProperty(property:Property) {
    return this.http.post(this.baseUrl + "/Property",property,{ 
      headers: this.header, 
    });
  }

  addUser(user: User) {
    return this.http.post(this.baseUrl + "/User/register", user, {
      headers: this.header,
    });
  }
  
    addReservation(reservation:Reservation) {
      return this.http.post(this.baseUrl + "/Reservation", reservation, {
        headers: this.header,
      });
    }

    addFavourite(favourite:Favourite) {
      return this.http.post(this.baseUrl + "/Favourite", favourite, {
        headers: this.header,
      });
    }

    deleteFavourite(propertyId: string,userId:string) {
      return this.http.delete(this.baseUrl + "/Favourite/user=" + userId.toString() + "/property="+ propertyId.toString(), {
        headers: this.header,
      });
    }

    editReservation(res: Reservation) {
      return this.http.put(this.baseUrl + "/Reservation/" + res.id.toString(), res, {
        headers: this.header,
      });
    }
    editUser(user:User){
      return this.http.put(this.baseUrl + "/User/" + user.id, user, {
        headers: this.header,
      });
    }
}
