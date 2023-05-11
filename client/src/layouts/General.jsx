import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import logo from "../assets/react.svg"
// core components
import GeneralNavbar from "../components/Navbars/GeneralNavbar";
import GeneralFooter from "../components/Footers/GeneralFooter";
import GeneralSidebar from "../components/Sidebars/GeneralSidebar";

import "../layouts/general.css"

import router from "../routes";

const General = (props) => {


  return (
    <>
    <div className="main-wrapper">
        <GeneralSidebar
          {...props}
          routes={router}
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
        <Container fluid>
          <GeneralFooter />
        </Container>
      </div>
    </div>
    </>
  );
};

export default General;