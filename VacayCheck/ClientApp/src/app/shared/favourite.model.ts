import { Property } from "./property.model";

export class Favourite {
  id: string;
  userId: string;
  propertyId: string;
  propertyName: string;
  property?:Property;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
