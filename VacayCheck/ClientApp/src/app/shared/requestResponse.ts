export class RequestResponse {

    id: number;
    email: string;
    token: string;
    constructor(input?: any) {
        Object.assign(this, input);
    }
}
