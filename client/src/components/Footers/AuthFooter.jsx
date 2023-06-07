import React from "react";

import { Row, Col } from "reactstrap"

export default function Footer() {
    return(
        <footer className="auth-footer">
          <Row className="align-items-center justify-content-center">
            <Col xl="6">
              <div className="copyright text-center text-xl-left">
                © {new Date().getFullYear()}{" "}
                <a
                  className="fw-bold ms-1 text-decoration-none"
                  href="https://github.com/mcmurray0125/BugTracker"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Michael Murray
                </a>
              </div>
            </Col>
          </Row>
        </footer>
    )
}