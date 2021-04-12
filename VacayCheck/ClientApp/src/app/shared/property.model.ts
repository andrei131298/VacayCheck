export class Property {
  id: string;
  name: string;
  type: string;
  description: string;
  numberOfStars: number;
  cityName: string;
  ownerName: string;
  street: string;
  streetNumber: number;
  photo: string;
  cityId: string;
  userId: string;
  startingPrice?: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
