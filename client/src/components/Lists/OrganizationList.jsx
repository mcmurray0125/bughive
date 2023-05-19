import { useState, useEffect } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap"
import API from "../../utilities/API";

export default function OrganizationList() {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      role: "",
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchOrganization = async () => {
            try {
            const organization = await API.getUsers(abortController);
            setAllUsers(organization);
            } catch (err) {
            if (!DOMException) {
                console.log(err);
            }
            }
        };

        fetchOrganization();
        return () => {
            abortController.abort();
        };
    }, []);

  return (
    <Card className="organization-wrapper">
        <CardHeader>Organization</CardHeader>
        <ListGroup>
            {allUsers.map((user) => {
                return (
                    <ListGroupItem
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        id={user.id}
                        active={user.id === selectedUser.id}
                    >
                        {user.first_name} {user.last_name}
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    </Card>
  )
}
