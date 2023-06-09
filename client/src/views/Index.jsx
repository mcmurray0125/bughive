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
            <div className="charts-container my-3">
              <div className="chart-wrapper card">
                <TicketsChart ticketsData={ticketsData} focus="status" /> {/* Chart for status */}
              </div>
              <div className="chart-wrapper card">
                <TicketsChart ticketsData={ticketsData} focus="priority" /> {/* Chart for priority */}
              </div>
              <div className="chart-wrapper card">
                <TicketsChart ticketsData={ticketsData} focus="type" /> {/* Chart for type */}
              </div>
            </div>
        </Container>
    )
}