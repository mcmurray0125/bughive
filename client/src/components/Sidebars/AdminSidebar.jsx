/*eslint-disable*/
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {routes, router} from '../../routes';

import { NavLink } from 'react-router-dom';
// reactstrap components
import {
  NavItem,
  Nav,
  Button
} from "reactstrap";

const AdminSidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const { setAuth, setRole } = useAuth();

  const adminRoute = routes.find(route => route.routeName === 'admin');
  const adminRoutes = adminRoute.children

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
              onClick={closeCollapse}
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
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
    <Nav vertical justified className="sidebar">
      {router && createLinks()}
      <hr/>
      <NavItem>
        <Button className="logout-btn btn-danger" onClick={logout}>Log out</Button>
      </NavItem>
    </Nav>
  );
};


export default AdminSidebar;