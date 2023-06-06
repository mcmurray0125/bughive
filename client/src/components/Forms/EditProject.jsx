import { useState, useEffect } from "react"
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap"
import API from "../../utilities/API";


export default function EditProject({ toggle, selectedProjectData, selectedProjectTeam, resetProjectId }) {
    const [values, setValues] = useState({
        name: selectedProjectData.name,
        description: selectedProjectData.description,
        team: selectedProjectTeam,
      });
    const [allUsers, setAllUsers] = useState([]);

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

    async function submit(event) {
    event.preventDefault();

    try {
        await API.removeAllTeamMembers(selectedProjectData.id);
        await API.updateProject(selectedProjectData.id, values);

        values.team.forEach(async (teamMemberId) => {
        await API.addTeamMember(selectedProjectData.id, { userId: teamMemberId });
        });
    } catch (err) {
        console.log(err);
    }

    setValues({ name: "", description: "", team: [] });

    resetProjectId();
    toggle();
    }

    // Fetch All Users
    useEffect(() => {
        let isRendered = true;

        async function fetchUsers() {
            try {
            const users = await API.getUsers();
            if (isRendered === true) setAllUsers(users);
            } catch (err) {
            console.log(err);
            }
        }

        fetchUsers();

        return () => {
            isRendered = false;
        };
    }, []);

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
                <Label className='m-1'>Update Team Members</Label>
                <Input
                type="select"
                name="team"
                value={values.team}
                onChange={handleChange}
                multiple
                >
                {allUsers.map((user, key) => {
                    return (
                    <option key={key} id={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                    </option>
                    );
                })}
                </Input>
                <Button type="submit" color="success" className="mt-4">
                    Submit
                </Button>
            </FormGroup>
        </Form>
    </Container>
  )
}
