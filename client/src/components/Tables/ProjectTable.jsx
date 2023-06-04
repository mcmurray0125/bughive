import {useEffect, useState} from "react";
import { Table, Button, Modal, ModalHeader } from "reactstrap"
import { Link } from "react-router-dom"

import UsersCell from "./UsersCell";
import API from "../../utilities/API";
import "../../assets/css/tables.css"
import CreateProject from "../Forms/CreateProject";

export default function ProjectTable() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

    const toggleNewProject = () => setIsNewProjectOpen(!isNewProjectOpen);

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
      }, [isNewProjectOpen]);

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
                <p className="dashboard-card-title ms-2">Projects</p>
                <Button className="new-project-btn" onClick={toggleNewProject}>New Project</Button>
            </div>
            <Modal isOpen={isNewProjectOpen} toggle={toggleNewProject} sz="sm">
                <ModalHeader toggle={toggleNewProject}>Add a New Project</ModalHeader>
                <CreateProject
                    toggle={toggleNewProject}
                    setProjects={setProjects}
                />
            </Modal>
            <Table className="table-1 m-0">
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
                                    <td><Link to={`/admin/project/${project.id}`}>{project.name}</Link></td>
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