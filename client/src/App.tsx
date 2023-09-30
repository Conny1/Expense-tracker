import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Update from "./pages/Update";
import Notfound from "./pages/Notfound";
import Getemail from "./pages/Getemail";
import Passwordreset from "./pages/Passwordreset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/forgot",
    element: <Getemail />,
  },
  {
    path: "/passwordreset",
    element: <Passwordreset />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
