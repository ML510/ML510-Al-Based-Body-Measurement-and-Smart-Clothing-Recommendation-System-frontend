import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";
import "./OrderConfirmed.css";

const defaultOrder = {
  orderId: "ATL-768785",
  customer: "Nimal",
  phone: "+94762874592",
  garment: "Shirt",
  profile: "Male",
  measurements: "8 Points Captured",
  estReady: "7–10 Days",
};

function CheckIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function OrderDetailRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-atelier-text-muted">{label}</span>
      <span
        className={
          highlight
            ? "text-atelier-gold font-semibold"
            : "font-medium text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default function OrderConfirmed({ order = defaultOrder, onNewOrder, onViewAllOrders }) {
  return (
    <div className="bg-atelier-bg text-atelier-text-light font-sans min-h-screen flex flex-col items-center pt-16 relative overflow-x-hidden">
      <div className="glow-effect"></div>

      {/* Header & Stepper */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 mb-12">
        <HeaderTitel />

        <SelecterBar />
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-[600px] px-4 pb-10">
        <div className="bg-atelier-card rounded-1xl p-10 md:p-14 flex flex-col items-center border border-white/5 shadow-2xl">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-atelier-green-bg flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-atelier-green/30 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full border-2 border-atelier-green flex items-center justify-center text-atelier-green">
              <CheckIcon className="w-6 h-6" />
            </div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl mb-5 text-white font-medium text-center">
            Order Confirmed
          </h2>

          {/* Order Details Subcard */}
          <div className="bg-atelier-subcard w-full max-w-md rounded-2xl p-8 mb-10 border border-white/5">
            <div className="flex flex-col space-y-4 text-sm md:text-base">
              <OrderDetailRow
                label="Order ID"
                value={order.orderId}
                highlight
              />
              <OrderDetailRow label="Customer" value={order.customer} />
              <OrderDetailRow label="Phone" value={order.phone} />
              <OrderDetailRow label="Garment" value={order.garment} />
              <OrderDetailRow label="Profile" value={order.profile} />
              <OrderDetailRow label="Measurements" value={order.measurements} />
              <OrderDetailRow label="Est. Ready" value={order.estReady} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              type="button"
              onClick={onNewOrder}
              className="flex-1 bg-atelier-gold hover:bg-atelier-gold-light text-atelier-bg font-semibold py-3.5 px-6 rounded-xl transition duration-300 ease-in-out shadow-[0_4px_14px_0_rgba(221,170,85,0.39)]"
            >
              New Order
            </button>
            <button
              type="button"
              onClick={onViewAllOrders}
              className="flex-1 bg-atelier-bg hover:bg-atelier-subcard text-white font-medium py-3.5 px-6 rounded-xl border border-white/10 transition duration-300 ease-in-out"
            >
              View All Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
