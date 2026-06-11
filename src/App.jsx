import AtelierDashboard from "./pages/Dashboard/AtelierDashboard"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NewCustomer from "./pages/NewCustomer/NewCustomer";
import SelectProfile from "./pages/SelectProfile/SelectProfile";
//import SelectGarment from "./pages/SelectGarment/SelectGarment";
import SelectClothing from "./pages/SelectClothing/SelectClothing";
import AIScan from "./pages/AIScan/AIScan";


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
    path: "/select-clothing",
    element: <SelectClothing/>,
  },
  {
    path: "/ai-scan",
    element: <AIScan/>,
  }
  
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App