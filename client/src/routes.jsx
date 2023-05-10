import Index from "views/Index";
import Register from "views/Register";
import Login from "views/Login";
import Administration from "views/Administration";
import Tickets from "views/Tickets";
import Project from "views/Project";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fa-solid fa-display",
    component: Index,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "fa-solid fa-display",
    component: Index,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "fa-solid fa-book",
    component: Tickets,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "fa-solid fa-book",
    component: Tickets,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/administration",
    name: "Administration",
    icon: "fa-solid fa-toolbox",
    component: Administration,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/project/:id",
    name: "Project",
    component: Project,
    layout: "general",
    root: "/general",
    display: false,
  },
  {
    path: "/project/:id",
    name: "Project",
    component: Project,
    layout: "admin",
    root: "/admin",
    display: false,
  },
];
export default routes;