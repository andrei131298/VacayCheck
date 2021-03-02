export class Apartment {
  id: string;
  apartmentName: string;
  numberofRooms: number;
  pricePerNight: number;
  maxPersons: number;
  description: string;
  propertyId: string;
  photos: string[];

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
