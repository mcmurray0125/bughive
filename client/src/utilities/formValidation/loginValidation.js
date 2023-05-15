export default async function validate(values) {
    let errors = {};
  
    //Email validation
    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
  
    //password validation
    return errors;
  }