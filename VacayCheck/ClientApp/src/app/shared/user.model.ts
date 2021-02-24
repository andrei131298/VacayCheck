export class User {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  bankAccount: string;
  email: string;
  password: string;
  isOwner:boolean;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
