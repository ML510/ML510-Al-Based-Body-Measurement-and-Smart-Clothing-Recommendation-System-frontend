import axios from "axios";

class MeasurementsService {
  async addMeasurements(measurementsData: any) {
    console.log("MeasurementsService-------Data", measurementsData);

    try {
      if (measurementsData?.gender === "MEN") {
        const response = await axios.post(
          "http://localhost:8080/men_measurement/save",
          measurementsData,
        );

        console.log("Response", response);
        return {
          success: true,
          data: response.data,
          status: response.status,
        };
      }

      if (measurementsData?.gender === "WOMEN") {
        console.log("WOMEN");

        const response = await axios.post(
          "http://localhost:8080/women_measurement/save",
          measurementsData,
        );
        console.log("Response", response);

        return {
          success: true,
          data: null,
          message: "WOMEN measurement flow is not implemented yet.",
        };
      }

      return {
        success: false,
        message: "Gender is missing or unsupported.",
      };
    } catch (error) {
      console.error("Error", error);
      return {
        success: false,
        message: "Failed to save measurements.",
        error,
      };
    }
  }
}

export default MeasurementsService;