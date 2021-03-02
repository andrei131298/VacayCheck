export class Reservation {
  id?: string;
  price: number;
  review: string;
  checkIn: Date;
  checkOut: Date;
  userId: string;
  apartmentId: string;
  numberOfPersons:number;
  propertyId?:string;
  apartmentName?: string;
  propertyName?:string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
