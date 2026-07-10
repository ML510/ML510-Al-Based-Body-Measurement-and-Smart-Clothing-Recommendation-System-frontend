
import "./OrderConfirmed.css";

// Stepper එකේ steps data (completed steps + active step)
const steps = [
  { id: 1, label: "Customer", status: "completed" },
  { id: 2, label: "Profile", status: "completed" },
  { id: 3, label: "Garment", status: "completed" },
  { id: 4, label: "AI Scan", status: "completed" },
  { id: 5, label: "Order", status: "active" },
];

// Order details data (backend එකෙන් props විදිහට pass කරන්න පුළුවන්)
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

function Stepper({ steps }) {
  return (
    <div className="flex items-center w-full max-w-2xl justify-between relative">
      {/* Steps අතර line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-atelier-gold/30 -z-10"></div>

      {steps.map((step) => (
        <div
          key={step.id}
          className="flex flex-col items-center bg-atelier-bg px-2 relative z-10"
        >
          {step.status === "completed" ? (
            <div className="w-10 h-10 rounded-full bg-atelier-gold flex items-center justify-center mb-3 text-atelier-bg shadow-[0_0_15px_rgba(221,170,85,0.4)]">
              <CheckIcon />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full border border-atelier-gold bg-transparent flex items-center justify-center mb-3 text-atelier-gold shadow-[0_0_15px_rgba(221,170,85,0.2)]">
              <span className="font-semibold">{step.id}</span>
            </div>
          )}
          <span
            className={
              step.status === "active"
                ? "text-[10px] tracking-widest text-white uppercase font-bold"
                : "text-[10px] tracking-widest text-atelier-text-muted uppercase font-medium"
            }
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
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

export default function OrderConfirmed({
  order = defaultOrder,
  onNewOrder,
  onViewAllOrders,
}) {
  return (
    <div className="bg-atelier-bg text-atelier-text-light font-sans min-h-screen flex flex-col items-center pt-16 relative overflow-x-hidden">
      <div className="glow-effect"></div>

      {/* Header & Stepper */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 mb-12">
        <div className="flex items-center space-x-2 border border-atelier-gold/30 rounded-full px-4 py-1.5 mb-6 bg-atelier-bg/50 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-atelier-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className="text-atelier-gold text-xs font-semibold tracking-wider uppercase">
            AI-Powered Fitting
          </span>
        </div>

        <h1 className="font-serif text-5xl mb-12 flex items-baseline gap-3">
          <span className="font-semibold text-white">New</span>
          <span className="italic text-atelier-gold font-medium">
            measurement
          </span>
        </h1>

        <Stepper steps={steps} />
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-[800px] px-4 pb-20">
        <div className="bg-atelier-card rounded-3xl p-10 md:p-14 flex flex-col items-center border border-white/5 shadow-2xl">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-atelier-green-bg flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-atelier-green/30 animate-pulse"></div>
            <div className="w-12 h-12 rounded-full border-2 border-atelier-green flex items-center justify-center text-atelier-green">
              <CheckIcon className="w-6 h-6" />
            </div>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white font-medium text-center">
            Order Confirmed
          </h2>
          <p className="text-atelier-text-muted text-lg mb-10 text-center">
            Your bespoke piece is in the works.
          </p>

          {/* Order Details Subcard */}
          <div className="bg-atelier-subcard w-full max-w-lg rounded-2xl p-8 mb-10 border border-white/5">
            <div className="flex flex-col space-y-4 text-sm md:text-base">
              <OrderDetailRow label="Order ID" value={order.orderId} highlight />
              <OrderDetailRow label="Customer" value={order.customer} />
              <OrderDetailRow label="Phone" value={order.phone} />
              <OrderDetailRow label="Garment" value={order.garment} />
              <OrderDetailRow label="Profile" value={order.profile} />
              <OrderDetailRow
                label="Measurements"
                value={order.measurements}
              />
              <OrderDetailRow label="Est. Ready" value={order.estReady} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
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