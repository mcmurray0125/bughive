import { useEffect, useState } from "react";
import API from "../../utilities/API";
import { Row } from "reactstrap";


export default function UsersCell(props) {
    const [projectUsers, setProjectUsers] = useState([])

    useEffect(() => {
    
        API.getProjectUsers(props.projectId).then((json) => {
            setProjectUsers(json);
        });
    
      }, [props.projectId]);
      
    
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