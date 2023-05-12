import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-start">
        <Col xl="6">
          <div className="copyright text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="fw-bold ml-1 text-decoration-none text-secondary"
              href="https://github.com/mcmurray0125"
              rel="noopener noreferrer"
              target="_blank"
            >
              Michael Murray
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;