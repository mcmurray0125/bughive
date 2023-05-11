import React from "react";
import { Outlet } from "react-router-dom"

import { Container, Row, Col } from "reactstrap"

import AuthFooter from "../components/Footers/AuthFooter"


export default function Auth(props) {

    return (
        <>
            {/* Page content */}
            <Container className="mt-5 pb-5">
              <Row className="justify-content-center">
                  <Outlet />
              </Row>
              </Container>
            <AuthFooter />
        </>
    )
}
