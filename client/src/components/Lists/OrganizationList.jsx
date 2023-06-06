import { useState, useEffect } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap"
import API from "../../utilities/API";

export default function OrganizationList({props}) {

  return (
    <Card className="admin-card">
        <CardHeader className="h5">Organization</CardHeader>
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
