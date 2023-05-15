import React from "react";
import API from "../utilities/API";
import useForm from "../utilities/formValidation/useForm"
import { useAuth } from "../contexts/AuthContext";
import validate from "../utilities/formValidation/loginValidation";
import { useNavigate } from "react-router-dom";

import {
    Form,
    InputGroup,
    InputGroupText,
    Input,
    Button
  } from "reactstrap";

import { Link } from "react-router-dom"


export default function Login() {
    const { setAuth, setRole } = useAuth();
    const navigate = useNavigate();

    const initialLoginValues = {
        email: "",
        password: "",
        };

    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        initialLoginValues,
        validate
        );

        
    async function submit() {
        console.log(values);
        const response = await API.login(values);
    
        if (response.ok) {
          // const { token, auth } = await response.json();
          const { token, role } = await response.json();
    
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
    
          setRole(role);
          setAuth(true);
    
          if (role === "admin") {
            navigate("/admin/index");
          } else if (role === "developer" || role === "project manager") {
            console.log("here");
            navigate("/general/index");
          }
    
          values.email = "";
          values.password = "";
        } else {
          alert("Invalid login");
        }
      }
    
    return(
        <>
        <div className="auth-card p-5">
            <Form onSubmit={handleSubmit} className="d-flex align-items-center flex-column">
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-envelope"></i>
                    </InputGroupText>
                    <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.email && (
                    <span className="text-danger w-100 text-start">
                        {errors.email}
                    </span>
                )}
                <br />
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-unlock"></i>
                    </InputGroupText>
                    <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.password && (
                    <span className="text-danger w-100 text-start">
                        {errors.password}
                    </span>
                )}
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
                <Button className="mt-4" type="submit">Sign in</Button>
            </Form>
        </div>
        <div className="login-links d-flex mt-2">
            <Link
                className="me-auto"
                onClick={(e) => e.preventDefault()}
            >
                Forgot Password
            </Link>
            <Link className="ms-auto" to="/auth/register">Create New Account</Link>
        </div>
        </>
    )
}