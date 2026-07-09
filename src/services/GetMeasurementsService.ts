import axios from "axios";

class GetMeasurementsService {
  async getMeasurements(data: any) {
    if (!data.image) {
      throw new Error("Image is required to get measurements.");
    }
    if (!data.gender) {
      throw new Error("Gender is required to get measurements.");
    }
    if (!data.clothingCodes || data.clothingCodes.length === 0) {
      throw new Error("clothingCodes is required to get measurements.");
    }

    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("gender", data.gender);

    data.clothingCodes.forEach((code: string) => {
      formData.append("clothingCodes", code);
    });

    if (data.heightCm) {
      formData.append("heightCm", data.heightCm);
    }

    const response = await axios.post(
      "http://localhost:8080/scan/analyze",
      formData
    );

    console.log(response.data);
    return response.data;
  }
}

export default GetMeasurementsService;