import { useState } from "react";
import "./NewCustomer.css";
import Header from "../../components/Header";
import { Customer } from "../../model/Customer";
import CustomerServices from "../../services/CustomerServices";
import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";
import { useNavigate } from "react-router-dom";

// const STEPS = [
//   { id: 1, label: "Customer" },
//   { id: 2, label: "Profile" },
//   { id: 3, label: "Garment" },
//   { id: 4, label: "AI Scan" },
//   { id: 5, label: "Order" },
// ];

// function Stepper({ current }) {
//   return (
//     <nav aria-label="Progress" className="nm-stepper">
//       <ol className="nm-stepper-list" role="list">
//         {STEPS.map((step, idx) => {
//           const isActive = step.id === current;
//           const isDone = step.id < current;
//           const isLast = idx === STEPS.length - 1;

//           return (
//             <li key={step.id} className="nm-step-item">
//               {!isLast && <div className="nm-stepper-line" />}
//               <span
//                 className={`nm-step-circle ${
//                   isActive
//                     ? "step-active"
//                     : isDone
//                       ? "step-done"
//                       : "step-inactive"
//                 }`}
//               >
//                 {isDone ? "✓" : step.id}
//               </span>
//               <span
//                 className={`nm-step-label ${
//                   isActive ? "label-active" : "label-inactive"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </li>
//           );
//         })}
//       </ol>
//     </nav>
//   );
// }

export default function NewCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // function setCustomer() {
  //   console.log("kkkkkkkkkkkkkkkkkkk");
  //   const customerData = new Customer("", name, phone, email, address);
  //   console.log(customerData);

  //   const customerservice = new CustomerServices();
  //   customerservice.addCustomer(customerData)
  //     .then((response) => {
  //       console.log("Customer added successfully:", response.data);
  //       // Optionally, you can reset the form or navigate to another page here
  //     })
  //     .catch((error) => {
  //       console.error("Error adding customer:", error);
  //       // Handle error (e.g., show an error message to the user)
  //     });

  //     setName("");
  //     setPhone("");
  //     setEmail("");
  //     setAddress("");
  // }

  async function setCustomer() {

  const errs = validate();

  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  try {

    const customerData = new Customer(
      "",
      name,
      phone,
      email,
      address
    );

    const customerservice = new CustomerServices();

    const response = await customerservice.addCustomer(customerData);

    console.log("Customer added successfully:", response.data);

    // CLEAR INPUTS (THIS WILL WORK NOW)
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");

    setErrors({});

    // setCurrentStep((s) => s + 1);

  } catch (error) {
    console.error("Error adding customer:", error);
  }
}

  // const [currentStep, setCurrentStep] = useState(1);
  
  const [errors, setErrors] = useState({});

  

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    return newErrors;
  };

  

  // const handleBack = () => {
  //   if (currentStep > 1) setCurrentStep((s) => s - 1);
  // };
const navigate = useNavigate()
  return (
    <div className="atelier-root">
      <Header />

      <div className="nm-root">
        {/* Background glow */}
        <div className="nm-glow" />

        <HeaderTitel />

        {/* Main */}
        <main className="nm-main">
          {/* <Stepper current={currentStep} /> */}
          <SelecterBar />

          {/* Form Card */}
          <div className="nm-card">
            {/* Card Header */}
            <div className="nm-card-header">
              <div className="nm-card-icon">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#B68B42"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 className="nm-card-title">Add Customer</h2>
                <p className="nm-card-sub">Begin a new bespoke order.</p>
              </div>
            </div>

            {/* Form */}
            <form className="nm-form" noValidate>
              {/* Full Name */}
              <div className="nm-field">
                <label className="nm-label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className={`nm-input ${errors.fullName ? "nm-input-error" : ""}`}
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Nimal Perera"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                {/* {errors.fullName && (
                  <p className="nm-error">{errors.fullName}</p>
                )} */}
              </div>

              {/* Phone & Email */}
              <div className="nm-row">
                <div className="nm-field">
                  <label className="nm-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className={`nm-input ${errors.phone ? "nm-input-error" : ""}`}
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+94 7X XXX XXXX"
                    // value={form.phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                  />
                  {/* {errors.phone && <p className="nm-error">{errors.phone}</p>} */}
                </div>
                <div className="nm-field">
                  <label className="nm-label" htmlFor="email">
                    Email <span className="nm-optional">(Optional)</span>
                  </label>
                  <input
                    className="nm-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    // value={form.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
              </div>

              <div className="nm-field">
                <label className="nm-label" htmlFor="address">
                  Address
                </label>
                <input
                  className={`nm-input ${errors.address ? "nm-input-error" : ""}`}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g. 123 Main Street"
                  
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
                {/* {errors.address && <p className="nm-error">{errors.address}</p>} */}
              </div>

              <div className="nm-divider" />

              {/* Actions */}
              <div className="nm-actions">
                <button
                  type="button"
                  className="nm-back-btn"
                  // onClick={handleBack}
                  // disabled={currentStep === 1}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <button
                  type="button"
                  className="nm-continue-btn"
                  onClick={() => {
                    setCustomer();
                    navigate('/select-profile');
                  }}
                >
                  Continue
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Step indicator text */}
          {/* <p className="nm-step-counter">
            Step {currentStep} of {STEPS.length}
          </p> */}
          <p className="nm-step-counter">
            Step {1} of {5}
          </p>
        </main>
      </div>
    </div>
  );
}
