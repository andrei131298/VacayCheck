export class User {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: Date;
  bankAccount: string;
  email: string;
  password: string;
  isOwner:boolean;
  profilePhoto:string;
  address: string;
  phoneNumber: string;
  country: string;
  cityName: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
