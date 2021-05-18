import { City } from "./city.model";

export class CityRequest {
    data: Array<Object>;

    constructor(input?: any) {
      Object.assign(this, input);
    }
  }
  