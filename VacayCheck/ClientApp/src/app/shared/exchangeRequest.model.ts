export class ExchangeRequest {
  id: string;
  requesterId: string;
  responderId: string;
  requesterApartmentId: string;
  responderApartmentId: string;
  checkIn: Date;
  checkOut: Date;
  numberOfPersons:number;


  constructor(input?: any) {
    Object.assign(this, input);
  }
}
