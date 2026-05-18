import AtelierDashboard from "./pages/Dashboard/AtelierDashboard"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NewCustomer from "./pages/NewCustomer/NewCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AtelierDashboard />,
  },
  {
    path: "/new-customer",
    element: <NewCustomer />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App