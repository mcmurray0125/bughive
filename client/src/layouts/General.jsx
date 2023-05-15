import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import logo from "../assets/react.svg"
// core components
import GeneralNavbar from "../components/Navbars/GeneralNavbar";
import GeneralFooter from "../components/Footers/GeneralFooter";
import GeneralSidebar from "../components/Sidebars/GeneralSidebar";
import { useAuth } from "../contexts/AuthContext";

import "../layouts/general.css"

import {routes} from "../routes";

const General = (props) => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated?
    <>
    <div className="main-wrapper">
        <GeneralSidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/general/index",
            imgSrc: {logo},
            imgAlt: "...",
          }}
        />
      <div className="main-content" >
        <GeneralNavbar
          {...props}
          brandText="Dashboard"
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

export default General;