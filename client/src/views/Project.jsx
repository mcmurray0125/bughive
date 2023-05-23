import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/tables.css"
import API from "../utilities/API";

import { Container } from "reactstrap"
import ProjectTeamTable from "../components/Tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/Tables/ProjectTicketsTable";

export default function Project() {
    const projectId = useParams().id;

    const [projectData, setProjectData] = useState({});
    const [projectTeam, setProjectTeam] = useState([]);
    const [projectTickets, setProjectTickets] = useState([]);

    //Get Project Team
    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchTeam() {
          try {
            const projectTeamRes = await API.getProjectUsers(
              projectId,
              abortController
            );
    
            setProjectTeam(projectTeamRes);
          } catch (err) {
            if (!abortController.signal.aborted) {
              console.log("Error fetching project team data", err);
            }
          }
        }
    
        fetchTeam();
    
        return () => {
          abortController.abort();
        };
      }, [projectId]);

      //Get Project Data
      useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchData() {
          try {
            const projectDataRes = await API.getProject(projectId, abortController);
            setProjectData(projectDataRes.data);
    
            const projectTicketsRes = await API.getProjectTickets(
              projectId,
              abortController
            );
            setProjectTickets(projectTicketsRes);
          } catch (err) {
            if (!abortController.signal.aborted) {
              console.log(`Error requesting project data: ${err}`);
            }
          }
        }
        fetchData();
        return () => {
          abortController.abort();
        };
      }, [projectId]);


    return(
        <Container className="dashboard-container py-2" fluid>
            <ProjectTeamTable
              projectTeam={projectTeam}
              setProjectTeam={setProjectTickets}  
              projectId={projectId}
            />
            <ProjectTicketsTable
              projectTickets={projectTickets}
              setProjectTeam={setProjectTickets}  
              projectId={projectId}
            />
        </Container>
    )
}