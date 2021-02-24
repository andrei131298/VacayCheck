export class Reservation {
  id?: number;
  price: number;
  review: string;
  checkIn: Date;
  checkOut: Date;
  userId: number;
  apartmentId: number;
  numberOfPersons:number;
  propertyId?:number;
  apartmentName?: string;
  propertyName?:string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
