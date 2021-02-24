export class LoginRequest {
 
    email: string;
    password: string;
    constructor(input?: any) {
        Object.assign(this, input);
    }
}
