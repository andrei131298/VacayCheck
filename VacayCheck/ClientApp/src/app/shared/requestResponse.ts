export class RequestResponse {

    id: string;
    email: string;
    token: string;
    constructor(input?: any) {
        Object.assign(this, input);
    }
}
