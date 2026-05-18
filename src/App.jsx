import AtelierDashboard from "./pages/Dashboard/AtelierDashboard"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NewCustomer from "./pages/NewCustomer/NewCustomer";
import SelectProfile from "./pages/SelectProfile/SelectProfile";
import HeaderTitel from "./components/HeaderTitel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AtelierDashboard />,
  },
  {
    path: "/new-customer",
    element: <NewCustomer />,
  },
  {
    path: "/select-profile",
    element: <SelectProfile />,
  },
  {
    path: "/header-title",
    element: <HeaderTitel />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App