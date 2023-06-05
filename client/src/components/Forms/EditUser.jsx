import { useState, useEffect } from 'react'
import { Card, Form, FormGroup, Label, Input, Button, CardHeader } from "reactstrap"
import { ToastContainer, toast } from "react-toastify"
import API from '../../utilities/API';

export default function EditUser({props}) {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(props.selectedUser)
  }, [props.selectedUser])

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setValues({ ...values, [name]: value });
  };

  if (props.selectedUser.id === "") {
    return (
      <Card className="admin-card">
          <CardHeader>Edit User Information</CardHeader>
          <div className='d-flex align-items-center h-100 p-3'>
              <h6 className='m-0'>No Dev Selected</h6>
          </div>
      </Card>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO: add validation, especially for phone number

    const formattedValues = {
      id: values.id,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      role: values.role,
    };

    try {
      await API.updateUser(props.selectedUser.id, formattedValues);

      toast.success("User information updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const organization = await API.getUsers();
      props.setAllUsers(organization);
      props.setSelectedUser(props.selectedUser);
    } catch (err) {
      console.log(err);
    }
  };
    
  return (
    <Card className="admin-card">
        <CardHeader className='mb-2'>Edit User Information</CardHeader>
        <Form className='ps-3 pe-3'>
          <div className='d-flex justify-content-between gap-2'>
            <FormGroup className='w-100'>
              <Label for="first_name" className="text-muted">
                First Name
              </Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className='w-100'>
              <Label for="last_name" className="text-muted">
                Last Name
              </Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
            </FormGroup>
          </div>
          <FormGroup >
            <Label for="email" className="text-muted">
              Last Name
            </Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup >
            <Label
              for="role"
              className="text-muted"
            >
              Authorization Level
            </Label>
            <Input
              type="select"
              name="role"
              id="role"
              value={values.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="project manager">
                Project Manager
              </option>
              <option value="developer">Developer</option>
            </Input>
          </FormGroup>
          <div className='d-flex justify-content-between edit-user-group mb-3 align-items-center'>
            <Button type='submit' onClick={handleSubmit} color="success">Submit</Button>
            <Button id="remove-user-btn" type='button' color="danger" size='sm'>Remove User</Button>
          </div>
        </Form>
        <ToastContainer/>
    </Card>
  )
}
