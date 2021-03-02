export class Favourite {
  id: string;
  userId: string;
  propertyId: string;
  propertyName: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
