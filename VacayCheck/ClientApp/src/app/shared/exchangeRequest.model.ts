export class ExchangeRequest {
  id: string;
  requesterId: string;
  responderId: string;
  requesterApartmentId: string;
  responderApartmentId: string;
  checkIn: Date;
  checkOut: Date;
  numberOfPersons:number;
  status: string;
  requesterApartmentName?: string;
  responderApartmentName?: string;


  constructor(input?: any) {
    Object.assign(this, input);
  }
}
