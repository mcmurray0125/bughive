import React from "react";
import { Outlet, Navigate } from "react-router-dom"
import { Container } from "reactstrap"

import AuthFooter from "../components/Footers/AuthFooter"
import { useAuth } from "../contexts/AuthContext";

import "./auth.css"


export default function Auth() {
    const { isAuthenticated } = useAuth()

    return (
        isAuthenticated ?
        <Navigate to="/general/index" />

        :
        
        <>
        <div className="bg-primary bg-gradient">
            <Container className="auth-wrapper d-flex flex-column align-items-center pt-5">
                <header className="header text-center py-5">
                        <h2 className="fw-bold">Bug Tracker</h2>
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

        </div>
        </>
    )
}
