export class Property {
  id: number;
  name: string;
  type: string;
  description: string;
  numberOfStars: number;
  cityName: string;
  ownerName: string;
  street: string;
  streetNumber: number;
  photo: string;
  cityId: number;
  userId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
