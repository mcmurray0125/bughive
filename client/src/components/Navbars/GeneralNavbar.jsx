import { Navbar, Container } from "reactstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const GeneralNavbar = ({ brandText }) => {
  const { username, rootPath } = useAuth();
  const location = useLocation();
  
  return (
    <>
      <Navbar expand="md" id="navbar-main">
        <Container fluid className="navbar-container">
          <h2>
            {brandText}
          </h2>
          {/* If on dashboard (index) page, render username in navbar */}
          {location.pathname == rootPath+"/index" &&
          <h5 id="username">
            {username}
          </h5>}
        </Container>
        <div className="navbar-texture"></div>
      </Navbar>
    </>
  );
};

export default GeneralNavbar;