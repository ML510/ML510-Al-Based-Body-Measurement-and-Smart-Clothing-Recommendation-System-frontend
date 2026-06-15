export class GetMeasurementsRequest {

    image: File;
    gender: string;
    clothingCodes: string[];
    customerId?: number;
    heightCm?: number;

    constructor(image: File,gender: string,clothingCodes: string[],customerId?: number,heightCm?: number) {
        this.image = image;
        this.gender = gender;
        this.clothingCodes = clothingCodes;
        this.customerId = customerId;
        this.heightCm = heightCm;
    }
}