import { useEffect, useState } from "react";
import API from "../../utilities/API";
import { Row } from "reactstrap";


export default function UsersCell({ projectId, selectedProjectId }) {
    const [projectUsers, setProjectUsers] = useState([])

    useEffect(() => {
    
        API.getProjectUsers(projectId).then((json) => {
            setProjectUsers(json);
        });
    
      }, [projectId, selectedProjectId]);
      
    
      if (projectUsers && projectUsers.length) {
        return (
          <>
            {projectUsers.map((user) => {
              return (
                <Row key={user.user_id}>
                    <span>{user.first_name} {user.last_name}</span>
                </Row>
              );
            })}
          </>
        );
      }

    return(
        <span>
            No Users Assigned
        </span>
    )
}