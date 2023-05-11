import { createBrowserRouter } from "react-router-dom";

import Index from "./views/Index";
import Register from "./views/Register";
import Login from "./views/Login";
import Administration from "./views/Administration";
import Tickets from "./views/Tickets";
import Project from "./views/Project";

import Auth from "./layouts/Auth";
import General from "./layouts/General"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fa-solid fa-display",
    element: Index,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "fa-solid fa-display",
    element: Index,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "fa-solid fa-book",
    element: Tickets,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "fa-solid fa-book",
    element: Tickets,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/administration",
    name: "Administration",
    icon: "fa-solid fa-toolbox",
    element: Administration,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    element: <Login />,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    element: Register,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/project/:id",
    name: "Project",
    element: Project,
    layout: "general",
    root: "/general",
    display: false,
  },
  {
    path: "/project/:id",
    name: "Project",
    element: Project,
    layout: "admin",
    root: "/admin",
    display: false,
  }
];

const router = createBrowserRouter([
  {
    path: "/auth/*",
    routeName: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        element: <Login />,
      },
      {
        path: "register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        element: <Register />,
      },
    ],
  },
  {
    path: "/general/*",
    routeName: "general",
    element: <General />,
    children: [
      {
        path: "",
        icon: "fa-solid fa-display",
        element: <Index />,
      },
      {
        path: "tickets",
        icon: "fa-solid fa-book",
        element: <Tickets />,
      },
      {
        path: "project/:id",
        element: <Project />,
      },
    ],
  }
]);

export default router

