import { Apartment } from "./apartment.model";

export class Reservation {
  id?: string;
  price: number;
  review: string;
  checkIn: Date;
  checkOut: Date;
  userId: string;
  apartmentId: string;
  numberOfPersons:number;
  paidWithCard: boolean;
  propertyId?:string;
  apartmentName?: string;
  propertyName?:string;
  apartment?:Apartment;
  userFirstName?: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
