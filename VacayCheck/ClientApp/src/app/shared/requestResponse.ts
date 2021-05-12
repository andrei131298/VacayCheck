export class RequestResponse {

    id: string;
    email: string;
    token: string;
    isMailVerificated: boolean;

    constructor(input?: any) {
        Object.assign(this, input);
    }
}
