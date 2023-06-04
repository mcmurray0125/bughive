import { useEffect, useState } from 'react';
import API from '../../utilities/API';
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function AddTeamMember({projectId, setProjectTeam, toggle }) {
    const [dbUsers, setDbUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchData() {
            try {
                const users = await API.getAvailableUsers(projectId, abortController);
                setDbUsers(users);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.log(`Error requesting project data: ${err}`);
                  }
            }
        }
    
        fetchData();
    
        return () => {
          abortController.abort();
        };
      }, [setSelectedUsers, projectId]);

      const handleChange = (event) => {
        let values = Array.from(
          event.target.selectedOptions,
          (option) => option.value
        );
    
        setSelectedUsers(values);
      };

      const submit = async (e) => {
        e.preventDefault();
    
        selectedUsers.forEach(async (userId) => {
          await API.addTeamMember(projectId, { userId });
        });
    
        const projectTeamRes = await API.getProjectUsers(projectId);
    
        setProjectTeam(projectTeamRes);
    
        toggle();
      };
      
  return (
    <Container>
        <Form onSubmit={submit}>
        <FormGroup>
            <Label className='m-1'>Available Users</Label>
            <Input
            type="select"
            name="availableUsers"
            value={selectedUsers}
            onChange={handleChange}
            multiple
            >
            {dbUsers.map((user, key) => {
                return (
                <option key={key} id={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                </option>
                );
            })}
            </Input>
            <Button type="submit" color="success" className="mt-4">
            Add Users Devs to Team
            </Button>
        </FormGroup>
        </Form>
    </Container>
  )
}
