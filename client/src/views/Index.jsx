import { useState, useEffect } from "react";
import { Container } from "reactstrap"
import ProjectTable from "../components/Tables/ProjectTable";
import TicketsChart from "../components/Charts/TicketsChart";
import API from "../utilities/API.js"

export default function Index() {
    const [ticketsData, setTicketsData] = useState([])

    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchUserTickets() {
          try {
            const userTicketsRes = await (
              await API.getUserTickets(abortController)
            ).json();
    
            setTicketsData(userTicketsRes);
          } catch (err) {
            if (!abortController.signal.aborted) {
              console.log("Error fetching user tickets", err);
            }
          }
        }
        
        fetchUserTickets();
        return () => {
          abortController.abort();
        };
      }, []);
    
    return(
        <Container className="dashboard-container py-2" fluid>
            <ProjectTable/>
            <div>
                <TicketsChart data={ticketsData} focus="status" /> {/* Chart for status */}
                <TicketsChart data={ticketsData} focus="priority" /> {/* Chart for priority */}
                <TicketsChart data={ticketsData} focus="type" /> {/* Chart for type */}
            </div>
        </Container>
    )
}