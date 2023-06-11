import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utilities/API";
import { Container } from "reactstrap"
import { SyncLoader } from "react-spinners"

import ProjectTeamTable from "../components/Tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/Tables/ProjectTicketsTable";
import SelectedTicket from "../components/Tickets/SelectedTicket";
import ProjectHeader from "../components/Headers/ProjectHeader";

export default function Project() {
    const projectId = useParams().id;
    const [loading, setLoading] = useState(true);

    const [projectData, setProjectData] = useState({});
    const [projectTeam, setProjectTeam] = useState([]);
    const [projectTickets, setProjectTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState({});
    const [memberModalOpen, setMemberModalOpen] = useState(false);
    const [assignedDevs, setAssignedDevs] = useState([]);

    const toggleNewMember = () => setMemberModalOpen(!memberModalOpen);

    //Get Project Team
    useEffect(() => {
      const abortController = new AbortController();
      setLoading(true);
  
      async function fetchTeam() {
        try {
          const projectTeamRes = await API.getProjectUsers(
            projectId,
            abortController
          );
  
          setProjectTeam(projectTeamRes);
          setLoading(false);
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
    }, [projectId, memberModalOpen]);

    //Get Project Data and Project Tickets
    useEffect(() => {
      const abortController = new AbortController();
      setLoading(true);
    
      async function fetchData() {
        try {
          const projectDataRes = await API.getProject(projectId, abortController);
          setProjectData(projectDataRes);
    
          const projectTicketsRes = await API.getProjectTickets(
            projectId,
            abortController
          );
          setProjectTickets(projectTicketsRes);
          setLoading(false);
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

    useEffect(() => {
      const abortController = new AbortController();
    
      async function fetchTicket() {
        try {
          if (selectedTicketId) {
            const ticket = await API.getTicket(
              projectId,
              selectedTicketId,
              abortController
            );
            setSelectedTicket(ticket);

            //Get users assigned to the ticket.
            const assignedDevs = await API.getDevAssignments(
              selectedTicketId,
              abortController
            );
            setAssignedDevs(assignedDevs);
          }
        } catch (err) {
          if (!abortController.signal.aborted) {
            console.log(`Error requesting project data: ${err}`);
          }
        }
      }
    
      fetchTicket();
    
      return () => {
        abortController.abort();
      };
    }, [selectedTicketId, projectId]);

    if (loading) {
      return (
        <div className="loading-wrapper d-flex gap-2 m-4">
          <h2 style={{color:"#372c62", zIndex: "5"}}>Loading</h2>
          <SyncLoader color="#372c62" />
        </div>
        );
    }
      
    return(
        <Container className="dashboard-container py-2" fluid>
          <ProjectHeader projectData={projectData}/>
          <div className="project-main-tables gap-2">
            <ProjectTeamTable
              projectTeam={projectTeam}
              setProjectTeam={setProjectTeam}  
              projectId={projectId}
              memberModalOpen={memberModalOpen}
              toggleNewMember={toggleNewMember}
              projectData={projectData}
            />
            <ProjectTicketsTable
              projectId={projectId}
              projectTickets={projectTickets}
              setProjectTickets={setProjectTickets}
              projectTeam={projectTeam}
              setProjectTeam={setProjectTickets}  
              selectedTicket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
              setSelectedTicketId={setSelectedTicketId}
              selectedTicketId={selectedTicketId}
              assignedDevs={assignedDevs}
            />
          </div>
          <SelectedTicket
            selectedTicket={selectedTicket}
            selectedTicketId={selectedTicketId}
            setSelectedTicket={setSelectedTicket}
            assignedDevs={assignedDevs}
          />
        </Container>
    )
}