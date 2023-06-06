import { useState, useEffect } from "react"
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap"
import API from "../../utilities/API";


export default function CreateProject({ toggle }) {
    const [values, setValues] = useState({ name: "", description: "", team: [] });
    const [availableTeamMembers, setAvailableTeamMembers] = useState([]);

    const handleChange = (event) => {
        let value;
    
        if (
          event.target.type === "select" ||
          event.target.type === "select-multiple"
        ) {
          value = Array.from(
            event.target.selectedOptions,
            (option) => option.value
          );
        } else {
          value = event.target.value;
        }
        const name = event.target.name;
    
        setValues({
          ...values,
          [name]: value,
        });
      };
    
    useEffect(() => {
    let isRendered = true;

    async function fetchUsers() {
        const users = await API.getUsers();
        if (isRendered === true) setAvailableTeamMembers(users);
    }

    fetchUsers();
    return () => {
        isRendered = false;
    };
    }, []);

    async function submit(event) {
    event.preventDefault();
    try {
        let projectId = await API.createProject(values);

        values.team.forEach(async (userId) => {
        await API.addTeamMember(projectId.id, { userId });
        });
    } catch (err) {
        console.log(err);
    }

    setValues({ name: "", description: "", team: [] });

    toggle();
    }

  return (
    <Container className="p-3">
        <Form onSubmit={submit}>
            <FormGroup>
                <Label htmlFor="name">Project Name</Label>
                <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter project name"
                value={values.name}
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Project Description</Label>
                <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label className='m-1'>Add Team Members</Label>
                <Input
                type="select"
                name="team"
                value={values.team}
                onChange={handleChange}
                multiple
                >
                {availableTeamMembers.map((user, key) => {
                    return (
                    <option key={key} id={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                    </option>
                    );
                })}
                </Input>
                <Button type="submit" color="success" className="mt-4">
                    Create
                </Button>
            </FormGroup>
        </Form>
    </Container>
  )
}
