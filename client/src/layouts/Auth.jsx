import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "reactstrap"
import { useLocation } from "react-router-dom";

import AuthFooter from "../components/Footers/AuthFooter"
import { useAuth } from "../contexts/AuthContext";

import "./auth.css"


export default function Auth() {
    const { isAuthenticated, role } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // redirect user away from login page based on role
        if (isAuthenticated && role) {
          if (role === "admin") {
            navigate("/admin/index");
          } else {
            navigate("/general/index");
          }
        } else if (location.pathname != "/auth/login" && location.pathname != "/auth/register") {
          navigate("/auth/login");
        }
      }, [isAuthenticated, role]);

    return (
        <>
        {/* Add Ternary, and display a redirecting.. message if authenticated. */}
        {!isAuthenticated &&
        <div className="auth-bg">
            <Container className="auth-wrapper d-flex flex-column align-items-center pt-5">
                <header className="auth-header text-center py-5">
                        <h2 className="fw-bold">BugHive</h2>
                        <p>Login or register</p>
                </header>
                {/* Page content */}
                <div className="auth-card-wrapper">
                    <Outlet />
                </div>
                <Container className="pt-5">
                    <AuthFooter />
                </Container>
            </Container>
            <div className="auth-texture"></div>
        </div>
        }
        </>
    )
}
