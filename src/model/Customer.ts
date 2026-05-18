export class Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;

    constructor(id:string, name: string, phone: string, email: string, address: string) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

}