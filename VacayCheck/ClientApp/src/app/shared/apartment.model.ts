export class Apartment {
  id: string;
  apartmentName: string;
  numberOfRooms: number;
  pricePerNight: number;
  maxPersons: number;
  description: string;
  propertyId: string;
  photos: string[];

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
