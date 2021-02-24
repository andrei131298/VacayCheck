export class Owner {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  bankAccount: string;
  email: string;
  password: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
