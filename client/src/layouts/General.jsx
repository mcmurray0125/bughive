import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import GeneralNavbar from "../components/Navbars/GeneralNavbar";
import GeneralFooter from "../components/Footers/GeneralFooter";
import GeneralSidebar from "../components/Sidebars/GeneralSidebar";

import router from "../routes";

const General = (props) => {


    const getBrandText = (path) => {
    for (let i = 0; i < router.length; i++) {
        if (router[i].path.indexOf(":") !== -1) {
        if (
            props.location.pathname.indexOf(
            router[i].layout +
                router[i].path.slice(0, router[i].path.indexOf(":"))
            ) !== -1
        ) {
            return router[i].name;
        }
        } else if (
        props.location.pathname.indexOf(router[i].layout + router[i].path) !==
        -1
        ) {
        return router[i].name;
        }
    }
    return "Brand";
    };

  return (
    <>
      <h1> NON ADMIN</h1>
      <GeneralSidebar
        {...props}
        routes={router}
        logo={{
          innerLink: "/general/index",
          imgSrc: require("../assets/img/brand/bug-tracker-logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <GeneralNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Outlet/>
        <Container fluid>
          <GeneralFooter />
        </Container>
      </div>
    </>
  );
};

export default General;