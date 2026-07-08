import axios from "axios";
import { GetMeasurements } from "../model/GetMeasurements";

class GetMeasurementsService {
  getMeasurements(measurementsDataObject: GetMeasurements) {
    console.log(
      "GetMeasurementsService - getMeasurements called with data:",
      measurementsDataObject,
    );
    // axios
    //   .post("http://localhost:8080/scan/analyze", measurementsDataObject)
    //   .then((response) => {
    //     console.log("Measurements retrieved successfully:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error retrieving measurements:", error);
    //   });
    // console.log("Measurements-------");
  }
}

export default GetMeasurementsService;
