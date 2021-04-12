import { Photo } from "./photo.model";

export class Apartment {
  id: string;
  apartmentName: string;
  numberOfRooms: number;
  pricePerNight: number;
  maxPersons: number;
  description: string;
  propertyId: string;
  photos: string[];
  photoObjects: Photo[];

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
