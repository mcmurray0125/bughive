import { Navigate, Outlet, useLocation } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import logo from "../assets/react.svg"
// core components
import AdminSidebar from "../components/Sidebars/AdminSidebar";
import GeneralNavbar from "../components/Navbars/GeneralNavbar";
import GeneralFooter from "../components/Footers/GeneralFooter";

import { useAuth } from "../contexts/AuthContext";
import "../layouts/general.css"

import {routes} from "../routes";

const Admin = (props) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const adminRoute = routes.find(route => route.routeName === 'admin');
  const adminRoutes = adminRoute.children

  const getBrandText = (path) => {
    const matchingRoute = adminRoutes.find((route) => {
      const routePath = route.path;
      return path.includes(routePath);
    });
  
    if (matchingRoute) {
      return matchingRoute.name;
    } else {
      return "Brand";
    }
  };
  

  return (
    isAuthenticated?
    <>
    <div className="main-wrapper">
        <AdminSidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: {logo},
            imgAlt: "...",
          }}
        />
      <div className="main-content" >
        <GeneralNavbar
          {...props}
          brandText={getBrandText(location.pathname)}
        />
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