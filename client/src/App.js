import react from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// axios
import { addJobAction } from "./pages/AddJob";
import { loginAction } from "./pages/Login";
import { registerAction } from "./pages/Register";
import {
  AddJob,
  AllJobs,
  Admin,
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Profile,
  Stats,
} from "./pages";
import dashboardLoader from "./pages/DashboardLayout";
import allJobsLoader from "./pages/DashboardLayout";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "landing",
        element: <Landing />,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />, // isDarkThemeEnabled={isDarkThemeEnabled}
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
