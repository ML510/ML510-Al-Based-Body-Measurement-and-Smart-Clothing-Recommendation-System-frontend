import { GetMeasurements } from "../model/GetMeasurements";

class GetMeasurementsService {
    getMeasurements(measurementsDataObject : GetMeasurements) {
        console.log("GetMeasurementsService - getMeasurements called with data:", measurementsDataObject);

    }
  
}

export default GetMeasurementsService