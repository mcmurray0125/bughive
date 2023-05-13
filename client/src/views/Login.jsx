import React from "react";
import {
    Form,
    InputGroup,
    InputGroupText,
    Input,
    Button
    
  } from "reactstrap";

import { Link } from "react-router-dom"


export default function Login() {


    
    return(
        <>
        <div className="auth-card p-5">
            <Form className="d-flex align-items-center flex-column">
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-envelope"></i>
                    </InputGroupText>
                    <Input placeholder="Email" />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-unlock"></i>
                    </InputGroupText>
                    <Input placeholder="Password" />
                </InputGroup>
                <br />
                <div className="align-self-start">
                    <input
                    id="rememberMeLogin"
                    type="checkbox"
                    />
                    <label
                    className="custom-control-label ms-1"
                    htmlFor="rememberMeLogin"
                    >
                        <span className="text-muted">Remember me</span>
                    </label>
                </div>
                <Button className="mt-4">Sign in</Button>
            </Form>
        </div>
        <div className="login-links d-flex mt-2">
            <Link className="me-auto">Forgot Password?</Link>
            <Link className="ms-auto" to="/auth/register">Create New Account</Link>
        </div>
        </>
    )
}