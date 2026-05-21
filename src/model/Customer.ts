export class Customer {
    id: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;

    constructor(id:string, name: string, email: string, address: string, phoneNumber: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

}