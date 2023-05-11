import React from "react";

import { Row, Col } from "reactstrap"

export default function Footer() {
    return(
        <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © {new Date().getFullYear()}{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://github.com/connorleee/BugTracker"
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