import { Navbar, Container } from "reactstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const GeneralNavbar = (props) => {
  const { username, rootPath } = useAuth();
  const location = useLocation();
  
  return (
    <>
      <Navbar expand="md" id="navbar-main">
        <Container fluid className="navbar-container">
          <h2>
            {props.brandText}
          </h2>
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