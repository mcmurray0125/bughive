/*eslint-disable*/
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/bughive-logo-color.png"
import purpleIcon from "../../assets/bughive-icon-purple.png"

import {routes, router} from '../../routes';

import { NavLink } from 'react-router-dom';
import {
  NavItem,
  Nav,
  Button
} from "reactstrap";

const AdminSidebar = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [collapseOpen, setCollapseOpen] = useState();
  const { setAuth, setRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const adminRoute = routes.find(route => route.routeName === 'admin');
  const adminRoutes = adminRoute.children

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getToggleStyles = () => {
    if (screenWidth < 995) {
      return !sidebarOpen ?
      { bottom: "-50px", left: "50dvw", }
      : 
      { bottom: "0px", left: "50dvw", borderRadius: "8px 8px 0px 0px" };
    } else {
      return { display: 'none' };
    }
  };

  const getSidebarStyles = () => {
    if (screenWidth < 995) {
      return sidebarOpen
        ? { top: "0" }
        : { top: "-100dvh" };
    }
  
    return { height: "auto" };
  };  

  const toggleSidebar = () => {
    if (screenWidth < 995 ) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // generate the links that appear in the left menu / Sidebar
  const createLinks = () => {
    return adminRoutes.map((prop, key) => {
      if (prop.layout === "admin" && prop.display) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.path}
              onClick={(closeCollapse, toggleSidebar)}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth(false);
    setRole("");
  };


  return (
    <>
      <Nav vertical justified className="sidebar" style={getSidebarStyles()}>
        {screenWidth <995 &&
        <div
          className="toggle"
          aria-label="toggle-sidebar"
          role="button"
          onClick={toggleSidebar}
          style={getToggleStyles()}
        >
          <img src={purpleIcon}/>
        </div>
        }
        <div className="logo-wrapper p-4">
          <img src={logo} className="logo p-2"/>
        </div>
        {router && createLinks()}
        <hr/>
        <NavItem>
          <Button className="logout-btn btn-danger" onClick={logout}>Log out</Button>
        </NavItem>
      </Nav>
    </>
  );
};


export default AdminSidebar;