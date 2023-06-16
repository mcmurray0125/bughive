import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Container } from "reactstrap";

import GeneralSidebar from "../components/Sidebars/GeneralSidebar";
import GeneralNavbar from "../components/Navbars/GeneralNavbar";
import GeneralFooter from "../components/Footers/GeneralFooter";

import { useAuth } from "../contexts/AuthContext";
import "../layouts/general.css"

import {routes} from "../routes";

const General = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const generalRoute = routes.find(route => route.routeName === 'general');
  const generalRoutes = generalRoute.children

  const getBrandText = (path) => {
    for (let i = 0; i < generalRoutes.length; i++) {
      if (generalRoutes[i].path.includes(":")) {
        const routePath = generalRoutes[i].path.replace(/\/:[^/]+/, "");
        const dynamicSegment = path.match(/\/(\d+)/)?.[1];
  
        if (path.includes(routePath) && dynamicSegment) {
          return generalRoutes[i].name;
        }
      } else if (path.includes(generalRoutes[i].path)) {
        return generalRoutes[i].name;
      }
    }
  
    return "Brand";
  };

  //Redirect to admin routes if not an admin.
  if (role === "admin") {
    window.location.pathname = "/admin/index";
  }

  return (
    isAuthenticated?
    <>
    <div className="main-wrapper">
      <GeneralSidebar />
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

export default General;