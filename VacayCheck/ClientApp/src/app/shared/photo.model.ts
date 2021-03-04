export class Photo {
    
    id:string;
    apartmentId: string;
    path: string;
    constructor(input?: any) {
        Object.assign(this, input);
    }
}
