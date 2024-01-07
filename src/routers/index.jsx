import { createBrowserRouter } from "react-router-dom";
import { LogIn } from "../pages/login/LogIn";
import { LogUp } from "../pages/logup/LogUp";
import { JiraTemplate } from "../templates/JiraTemplate";
import { Suspense, lazy } from "react";
import { ProjectManagement } from "../pages/projectManagement/ProjectManagement";
import { ProjectDetail } from "../pages/projectDetail/ProjectDetail";
// const ProjectDetail = lazy(() =>
//   import("../pages/project-detail/project-detail")
// );

export const router = createBrowserRouter([
  {
    element: <JiraTemplate />,
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <ProjectManagement />,
          </Suspense>
        ),
      },
      {
        path: "projectDetail/:projectId",
        element: <ProjectDetail />,
      },
    ],
  },
  { index: true, path: "/", element: <LogIn /> },
  { path: "logup", element: <LogUp /> },
]);
