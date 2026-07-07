export class GetMeasurements {
    image?: File;
    gender?: string;
    clothingCodes: string[] = [];
    heightCm?: number;

    constructor(
        image?: File,
        gender?: string,
        clothingCodes: string[] = [],
        heightCm?: number
    ) {
        this.image = image;
        this.gender = gender;
        this.clothingCodes = clothingCodes;
        this.heightCm = heightCm;
    }
}