export class UserInfo {

    id: number;
    full_name: string;
    email: string;
    telephone: string;

    constructor(full_name?, email?, telephone?) {
        this.full_name = full_name;
        this.email = email;
        this.telephone = telephone;
    }
}