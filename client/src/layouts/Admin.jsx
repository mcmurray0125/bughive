import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Container } from "reactstrap";

import AdminSidebar from "../components/Sidebars/AdminSidebar";
import GeneralNavbar from "../components/Navbars/GeneralNavbar";
import GeneralFooter from "../components/Footers/GeneralFooter";

import { useAuth } from "../contexts/AuthContext";
import "../layouts/general.css" //Same css file for admin and general layouts

import {routes} from "../routes";

const Admin = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const adminRoute = routes.find(route => route.routeName === 'admin');
  const adminRoutes = adminRoute.children

  const getBrandText = (path) => {
    for (let i = 0; i < adminRoutes.length; i++) {
      if (adminRoutes[i].path.includes(":")) {
        const routePath = adminRoutes[i].path.replace(/\/:[^/]+/, "");
        const dynamicSegment = path.match(/\/(\d+)/)?.[1];
  
        if (path.includes(routePath) && dynamicSegment) {
          return adminRoutes[i].name;
        }
      } else if (path.includes(adminRoutes[i].path)) {
        return adminRoutes[i].name;
      }
    }
  
    return "Brand";
  };

  if (role === "developer") {
    window.location.pathname = "/general/index";
  }

  return (
    isAuthenticated?
    <>
    <div className="main-wrapper">
      <AdminSidebar routes={routes} />
      <div className="main-content" >
        <GeneralNavbar brandText={getBrandText(location.pathname)} />
        <Outlet/>
        <Container className="footer-container p-3" fluid>
          <GeneralFooter />
        </Container>
      </div>
    </div>
    </>
    :
    <Navigate to="/auth/login"/>
  );
};

export default Admin;