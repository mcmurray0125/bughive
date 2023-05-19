import {useEffect, useState} from "react";
import { Table, Button } from "reactstrap"

import UsersCell from "./UsersCell";
import API from "../../utilities/API";
import "../../assets/css/tables.css"

export default function ProjectTable() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
          try {
            const projectsData = await API.getProjects();
            setProjects(projectsData);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }
    
        fetchProjects();
      }, []);

    if (loading) {
        return (
            <>
              <h2>Loading...</h2>
            </>
          );
    }
          
    return(
        <>
        <div className="table-wrapper p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title">Projects</p>
                <Button className="dashboard-btn">New Project</Button>
            </div>
            <Table className="projects-table m-0">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Collaborators</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {projects &&
                        projects.map((project) => {
                            return(
                                <tr key={project.id}>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>
                                        <UsersCell projectId={project.id}/>                       
                                    </td>
                                    <td className="d-flex justify-content-center align-items-center projects-more">
                                        <i className="fa-solid fa-ellipsis-vertical project-ellipsis"></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
        </>
    )
}