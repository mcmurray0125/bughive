import { useEffect, useState } from "react";
import API from "../../utilities/API";


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
                  <td key={user.user_id}>
                    {user.first_name} {user.last_name}
                  </td>
              );
            })}
          </>
        );
      }

    return(
        <td>
            No Users Assigned
        </td>
    )
}