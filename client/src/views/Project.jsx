import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utilities/API";
import { Container } from "reactstrap"

import ProjectTeamTable from "../components/Tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/Tables/ProjectTicketsTable";
import SelectedTicket from "../components/Tickets/SelectedTicket";
import ProjectHeader from "../components/Headers/ProjectHeader";

export default function Project() {
    const projectId = useParams().id;

    const [projectData, setProjectData] = useState({});
    const [projectTeam, setProjectTeam] = useState([]);
    const [projectTickets, setProjectTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState({});

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
            setProjectData(projectDataRes);
    
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
          <ProjectHeader projectData={projectData}/>
          <div className="project-main-tables gap-2">
            <ProjectTeamTable
              projectTeam={projectTeam}
              setProjectTeam={setProjectTickets}  
              projectId={projectId}
            />
            <ProjectTicketsTable
              projectId={projectId}
              projectTickets={projectTickets}
              setProjectTeam={setProjectTickets}  
              selectedTicket={selectedTicket}
              setSelectedTicketId={setSelectedTicketId}
            />
          </div>
          <SelectedTicket
            selectedTicket={selectedTicket}
            selectedTicketId={selectedTicketId}
            setSelectedTicket={setSelectedTicket}
          />
        </Container>
    )
}