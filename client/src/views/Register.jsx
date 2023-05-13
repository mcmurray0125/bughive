import React from "react";
import {
    Form,
    InputGroup,
    InputGroupText,
    Input,
    Button
    
  } from "reactstrap";

  import { Link } from "react-router-dom"

export default function Register() {
    
    return(
        <>
        <div className="auth-card p-5">
            <Form className="d-flex align-items-center flex-column">
            <p className="fs-4 mb-5">Sign up</p>
                <div className="name-inputs">
                    <InputGroup>
                        <InputGroupText className="bg-white">
                            <i className="fa-solid fa-signature"></i>
                        </InputGroupText>
                        <Input placeholder="First Name" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText className="bg-white">
                            <i className="fa-solid fa-signature"></i>
                        </InputGroupText>
                        <Input placeholder="Last Name" />
                    </InputGroup>
                </div>
                <br />
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
                <InputGroup>
                    <InputGroupText className="bg-white">
                    <i className="fa-solid fa-lock"></i>
                    </InputGroupText>
                    <Input placeholder="Confirm Password" />
                </InputGroup>
                <Button className="mt-4">Sign in</Button>
            </Form>
        </div>
        <div className="login-links d-flex mt-2">
            Already have an account? &nbsp;<Link to="/auth/login" className="me-auto">Login</Link>
        </div>
        </>
    )
}