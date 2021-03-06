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
import { Photo } from "src/app/shared/photo.model";
import { ExchangeRequest } from "src/app/shared/exchangeRequest.model";
import { CityRequest } from "src/app/shared/cityRequest.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  header2 = new HttpHeaders({
    "Content-Type": "text",
  });
  baseUrl = "https://localhost:44397/api";
  countriesUrl = "https://restcountries.eu/rest/v2/all";
  citiesUrl = "https://countriesnow.space/api/v0.1/countries/population/cities/filter"

  getCountries(){
    return this.http.get(this.countriesUrl, {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    });
  }

  getAvailableProperties(searchText: string, checkin: string, checkout: string, persons: number){
    return this.http.get(this.baseUrl + "/Property/GetAvailableProperties/" + searchText + "/" + checkin + "/" + checkout + "/" + persons, {
      headers: this.header,
    });
  }
  getAvailableApartments(propertyId: string, checkin: string, checkout: string, persons: number){
    return this.http.get(this.baseUrl + "/Property/GetAvailableApartments/" + propertyId + "/" + checkin + "/" + checkout + "/" + persons, {
      headers: this.header,
    });
  }
  getCityByCountryName(countryName: string){
    return this.http.post(this.citiesUrl, {
      "order": "asc",
      "orderBy": "name",
      "country": countryName
    },{
      headers : this.header,
    });
  }

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
  getForgotPasswordResponse(email: string){
    return this.http.get(this.baseUrl + "/User/forgotPassword/" + email, {
      headers: this.header,
  });
  }
  getFavouriteByUserAndProperty(userId: string,propertyId:string){
    return this.http.get(this.baseUrl + "/Favourite/user=" + userId + "/property="+ propertyId, {
      headers: this.header,
    });
  }

  getExchangeRequestByRequester(requesterId: string){
    return this.http.get(this.baseUrl + "/ExchangeRequest/requester/" + requesterId, {
      headers: this.header,
    });
  }

  getExchangeRequestByResponder(responderId: string){
    return this.http.get(this.baseUrl + "/ExchangeRequest/responder/" + responderId, {
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
  
  checkApartmentAvailability(apartmentId, requesterCheckin, requesterCheckout, responderCheckin, responderCheckout, persons){
    return this.http.get(this.baseUrl + "/Apartment/" + apartmentId + "/" + requesterCheckin + "/" + requesterCheckout + "/" + responderCheckin + "/" + responderCheckout + "/" + persons, {
      headers: {"Content-Type": "text/plain"},
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
  getReservationsByApartment(apartmentId:string){
    return this.http.get(this.baseUrl + "/Reservation/apartment/" + apartmentId, {
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

    addApartment(apartment: Apartment){
      return this.http.post(this.baseUrl + "/Apartment", apartment, {
        headers: this.header,
      });
    }

    addPhoto(photo: Photo){
      return this.http.post(this.baseUrl + "/Photo", photo, {
        headers: this.header,
      });
    }

    addExchangeRequest(req: ExchangeRequest){
      return this.http.post(this.baseUrl + "/ExchangeRequest", req, {
        headers: this.header,
      });
    }

    deleteFavourite(propertyId: string,userId:string) {
      return this.http.delete(this.baseUrl + "/Favourite/user=" + userId.toString() + "/property="+ propertyId.toString(), {
        headers: this.header,
      });
    }

    deletePhoto(photo: Photo){
      return this.http.delete(this.baseUrl + "/Photo/" + photo.id, {
        headers: this.header,
      });
    }

    deleteReservation(reservation: Reservation){
      return this.http.delete(this.baseUrl + "/Reservation/" + reservation.id, {
        headers: this.header,
      });
    }

    editApartment(apartment: Apartment, apartmentId: string){
      return this.http.put(this.baseUrl + "/Apartment/" + apartmentId, apartment, {
        headers: this.header,
      });
    }

    editReservation(res: Reservation) {
      return this.http.put(this.baseUrl + "/Reservation/" + res.id.toString(), res, {
        headers: this.header,
      });
    }

    editProperty(property: Property, propertyId: string){
      return this.http.put(this.baseUrl + "/Property/" + propertyId, property, {
        headers: this.header,
      });
    }

    editUser(user:User){
      return this.http.put(this.baseUrl + "/User/" + user.id, user, {
        headers: this.header,
      });
    }
    updateUserDetails(user:User, userId: string){
      return this.http.put(this.baseUrl + "/User/" + userId, user, {
        headers: this.header,
      });
    }
    updateExchangeRequest(exchangeRequest: ExchangeRequest){
      return this.http.put(this.baseUrl + "/ExchangeRequest/"+ exchangeRequest.id, exchangeRequest, {
        headers: this.header,
      });
    }
    updateIsPublic(property: Property, propertyId: string){
      return this.http.put(this.baseUrl + "/Property/changeAvailability/"+ propertyId, property, {
        headers: this.header,
      });
    }
    updateIsOwner(user: User, userId: string){
      return this.http.put(this.baseUrl + "/User/changeOwnerStatus/"+ userId, user, {
        headers: this.header,
      });
    }
}
