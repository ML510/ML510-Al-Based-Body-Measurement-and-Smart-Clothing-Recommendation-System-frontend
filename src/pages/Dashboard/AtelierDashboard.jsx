// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./AtelierDashboard.css";

const orders = [
  {
    id: "ATL-583921",
    name: "Nimal Perera",
    type: "Suit",
    time: "2 hours ago",
    status: "In Progress",
    statusType: "progress",
  },
  {
    id: "ATL-583918",
    name: "Kavindi Silva",
    type: "Saree Blouse",
    time: "5 hours ago",
    status: "Ready",
    statusType: "ready",
  },
  {
    id: "ATL-583902",
    name: "Roshan Fernando",
    type: "Shirt",
    time: "Yesterday",
    status: "Cutting",
    statusType: "cutting",
  },
  {
    id: "ATL-583897",
    name: "Sanduni Jayawardena",
    type: "Dress",
    time: "Yesterday",
    status: "Ready",
    statusType: "ready",
  },
];

const stats = [
  { label: "Active Orders", value: "24", change: "+12%", icon: "📦" },
  { label: "Customers", value: "186", change: "+8%", icon: "👥" },
  { label: "Scans This Week", value: "47", change: "+23%", icon: "✨" },
  { label: "Revenue", value: "Rs 284k", change: "+18%", icon: "📈" },
];


function StatusBadge({ status, type }) {
  const map = {
    progress: "badge-progress",
    ready: "badge-ready",
    cutting: "badge-cutting",
  };
  return (
    <span className={`status-badge ${map[type] || "badge-cutting"}`}>
      {type === "progress" && <span className="pulse-dot" />}
      {type === "ready" && <span className="check-icon">✓</span>}
      {type === "cutting" && <span className="clock-icon">⏰</span>}
      {status}
    </span>
  );
}

export default function AtelierDashboard() {
    const navigate = useNavigate()

  return (
    <div className="atelier-root">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="atelier-main">
        {/* Greeting */}
        <section className="greeting-section">
          <div>
            <span className="welcome-chip">✦ Welcome Back</span>
            <h2 className="greeting-title">
              Your <em>atelier</em>, today
            </h2>
            <p className="greeting-sub">
              An overview of orders, customers and AI-powered fittings.
            </p>
          </div>
          <button className="cta-btn" onClick={() => navigate('/new-customer')}>✦ New AI Measurement</button>
        </section>

        {/* Stats */}
        <section className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-top">
                <div className="stat-icon">{s.icon}</div>
                <span className="stat-change">{s.change}</span>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Lower Grid */}
        <section className="lower-grid">
          {/* Orders Table */}
          <div className="orders-card">
            <div className="orders-header">
              <h3 className="orders-title">Recent Orders</h3>
              <a href="#" className="view-all-link">
                View All →
              </a>
            </div>

            {/* Flowbite-style table */}
            <div className="overflow-x-auto">
              <table className="atelier-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Order ID</th>
                    <th>Garment</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="order-row">
                      <td>
                        <div className="customer-cell">
                          <div className="avatar">{order.name.charAt(0)}</div>
                          <span className="customer-name">{order.name}</span>
                        </div>
                      </td>
                      <td className="order-id">{order.id}</td>
                      <td>{order.type}</td>
                      <td className="order-time">{order.time}</td>
                      <td>
                        <StatusBadge
                          status={order.status}
                          type={order.statusType}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Scan Card */}
          <div className="scan-card">
            <div className="scan-bg-deco" />
            <div className="scan-icon-wrap">✦</div>
            <h3 className="scan-title">AI Body Scan</h3>
            <p className="scan-desc">
              Capture every measurement in seconds with our vision‑AI scanner.
            </p>
            <button className="scan-btn" onClick={() => navigate('/new-customer')}>
              Start Scan <span>→</span>
            </button>
            <ul className="scan-steps">
              {[
                "Add customer",
                "Pick garment",
                "Scan body",
                "Auto measurements",
              ].map((step) => (
                <li key={step} className="scan-step">
                  <span className="step-check">✓</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
