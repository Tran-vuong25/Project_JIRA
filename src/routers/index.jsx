import { createBrowserRouter } from "react-router-dom";
import { LogIn } from "../pages/login/LogIn";
import { LogUp } from "../pages/logup/LogUp";
import { JiraTemplate } from "../templates/JiraTemplate";
import { ProjectManagement } from "../pages/home/ProjectManagement";

export const router = createBrowserRouter([
  {
    path: "",
    element: <LogIn />,
  },
  {
    path: "logup",
    element: <LogUp />,
  },
  {
    element: <JiraTemplate />,
    children: [
      {
        path: "projectmanagement",
        element: <ProjectManagement />,
      },
    ],
  },
]);
