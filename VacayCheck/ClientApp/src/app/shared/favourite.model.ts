export class Favourite {
  id: number;
  userId: number;
  propertyId: number;
  propertyName: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
