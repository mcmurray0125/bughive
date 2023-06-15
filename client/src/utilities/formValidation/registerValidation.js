import API from "../API";
// import parsePhoneNumber from "libphonenumber-js";

export default async function registerValidation(values) {
  let errors = {};

  //Name validation
  if (values.hasOwnProperty("firstName") && !values.firstName) {
    errors.firstName = "First name is required";
  }

  if (values.hasOwnProperty("lastName") && !values.lastName) {
    errors.lastName = "Last name is required";
  }

  //Email validation
  if (values.hasOwnProperty("email")) {
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    } else {
      try {
        const res = await API.lookupUserByEmail({ email: values.email });

        if (res.length > 0) {
          errors.email = "Email already exists";
        }
      } catch (err) {
        console.log(err, "Error looking up email in database");
      }
    }
  }

  // Password validation
  if (values.hasOwnProperty("password")) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be 8 or more characters";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords entered do not match";
    }
  }

  // Lease form validation
  if (values.hasOwnProperty("property") && !values.property) {
    errors.property = "Select a property";
  }

  if (values.hasOwnProperty("startDate") && !values.startDate) {
    errors.startDate = "Enter lease start date";
  }

  if (values.hasOwnProperty("endDate") && !values.endDate) {
    errors.endDate = "Enter lease end date";
  }

  return errors; //need to make sure promises resolve before returning some how
}