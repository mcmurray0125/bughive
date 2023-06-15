import useForm from "../utilities/formValidation/useForm";
import registerValidation from "../utilities/formValidation/registerValidation";
import { useNavigate } from "react-router-dom";
import {
    Form,
    InputGroup,
    InputGroupText,
    Input,
    Button
    
  } from "reactstrap";

import API from "../utilities/API";
import { Link } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate();
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    
      const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        initialValues,
        registerValidation
      );
    
      function submit() {    
        //user authority defaults to developer
        API.addUser({ ...values, role: "developer" });
        navigate("/auth/login");
      }
    
    return(
        <>
        <div className="auth-card p-5">
            <Form className="d-flex align-items-center flex-column" onSubmit={handleSubmit}>
            <p className="auth-card-title fs-5 mb-4">Sign up</p>
                <div className="name-inputs">
                    <InputGroup>
                        <InputGroupText className="bg-white">
                            <i className="fa-solid fa-signature"></i>
                        </InputGroupText>
                        <Input
                            id="firstName"
                            placeholder="First Name"
                            name="firstName"
                            type="text"
                            value={values.firstName}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    {errors.firstName && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.firstName}
                      </div>
                    )}
                    <br />
                    <InputGroup>
                        <InputGroupText className="bg-white">
                            <i className="fa-solid fa-signature"></i>
                        </InputGroupText>
                        <Input      
                            id="lastName"
                            placeholder="Last Name"
                            name="lastName"
                            type="text"
                            value={values.lastName}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    {errors.lastName && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.lastName}
                      </div>
                    )}
                </div>
                <br />
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-envelope"></i>
                    </InputGroupText>
                    <Input
                        id="email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.email && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.email}
                  </div>
                )}
                <br />
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-unlock"></i>
                    </InputGroupText>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.password && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.password}
                  </div>
                )}
                <br />
                <InputGroup>
                    <InputGroupText className="bg-white">
                    <i className="fa-solid fa-lock"></i>
                    </InputGroupText>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.confirmPassword && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.confirmPassword}
                  </div>
                )}
                <Button className="mt-4" type="submit">Sign Up</Button>
            </Form>
        </div>
        <div className="login-links d-flex mt-2 justify-content-center">
            Already have an account? &nbsp;<Link to="/auth/login">Login</Link>
        </div>
        </>
    )
}