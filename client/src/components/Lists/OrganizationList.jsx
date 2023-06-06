import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap"

export default function OrganizationList({props}) {

  return (
    <Card className="admin-card">
        <CardHeader>
            <p className="dashboard-card-title">Organization</p>
        </CardHeader>
        <ListGroup className="p-3">
            {props.allUsers.map((user) => {
                return (
                    <ListGroupItem
                        key={user.id}
                        onClick={() => props.setSelectedUser(user)}
                        id={user.id}
                        active={user.id === props.selectedUser.id}
                    >
                        {user.first_name} {user.last_name}
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    </Card>
  )
}
