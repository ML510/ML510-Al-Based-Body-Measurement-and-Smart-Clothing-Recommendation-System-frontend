import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "New Order", active: true },
  { label: "Customers", active: true },
  { label: "Orders", active: true },
];

function Header() {
  //const [activeNav, setActiveNav] = useState("Dashboard");
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");
  return (
    <div>
      <header className="atelier-header">
        <div className="header-brand">
          <div className="brand-icon">✂</div>
          <div>
            <h1 className="brand-title">Atelier·AI</h1>
            <p className="brand-sub">Bespoke Intelligence</p>
          </div>
        </div>

        {/* <nav className="header-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "nav-active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              {item.label}
            </button>
          ))}
        </nav> */}

        <nav className="header-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "nav-active" : ""}`}
              onClick={() => {
                setActiveNav(item.label);
                navigate(item.label=="Dashboard" ? "/" : item.label=="New Order" ? "/new-customer" : item.label=="Customers" ? "/customers" : "/orders");
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* <nav className="header-nav">
          <button
            className={`nav-item ${activeNav === "Dashboard" ? "nav-active" : ""}`}
            onClick={() => {
              setActiveNav("Dashboard");
              navigate("/");
            }}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${activeNav === "New Order" ? "nav-active" : ""}`}
            onClick={() => {
              setActiveNav("New Order");
              navigate("/new-customer");
            }}
          >
            New Order
          </button>

          <button
            className={`nav-item ${activeNav === "Customers" ? "nav-active" : ""}`}
            onClick={() => {
              setActiveNav("Customers");
              navigate("/customers");
            }}
          >
            Customers
          </button>

          <button
            className={`nav-item ${activeNav === "Orders" ? "nav-active" : ""}`}
            onClick={() => {
              setActiveNav("Orders");
              navigate("/orders");
            }}
          >
            Orders
          </button>
        </nav> */}

        {/* <nav className="header-nav">
          
            <button className="nav-item" onClick={() => navigate('/new-customer')}>Dashboard</button>
            <button className="nav-item" onClick={() => navigate('/new-customer')}>New Order</button>
            <button className="nav-item" onClick={() => navigate('/new-customer')}>Customers</button>
            <button className="nav-item" onClick={() => navigate('/new-customer')}>Orders</button>
          
        </nav> */}

        <button className="icon-btn" title="Toggle theme">
          ☀
        </button>
      </header>
    </div>
  );
}

export default Header;
