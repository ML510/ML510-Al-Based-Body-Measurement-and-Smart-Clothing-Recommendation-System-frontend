import { useContext } from "react";
import { Customer } from "../model/Customer";
import axios from "axios";

class CustomerServices {
  addCustomer(customerData: Customer) {
    console.log("Customer phone Number:", customerData.phoneNumber);
    console.log("Adding customer:", customerData);
    axios.post('http://localhost:8080/customer/save', customerData)
      .then(response => {
        console.log("Customer added successfully:", response.data);
      })
      .catch(error => {
        console.error("Error adding customer:", error);
      });
      console.log("Ava");
  }
}

export default CustomerServices;
