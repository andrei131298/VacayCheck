export class Property {
  id: string;
  name: string;
  type: string;
  description: string;
  numberOfStars: number;
  cityName: string;
  country: string;
  ownerName: string;
  street: string;
  streetNumber: number;
  photo: string;
  userId: string;
  mapLatitude: number;
  mapLongitude: number;
  isPublic: boolean;
  startingPrice?: number;
  averageRating?: number;
  
  constructor(input?: any) {
    Object.assign(this, input);
  }
}
