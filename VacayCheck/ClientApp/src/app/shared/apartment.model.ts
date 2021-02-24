export class Apartment {
  id: number;
  apartmentName: string;
  numberofRooms: number;
  pricePerNight: number;
  maxPersons: number;
  description: string;
  propertyId: number;
  photos: string[];

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
