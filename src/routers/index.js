import { createBrowserRouter } from "react-router-dom";
import { LogIn } from "../pages/login/LogIn";

export const router = createBrowserRouter([
  {
    path: "",
    element: <LogIn />,
  },
]);
