import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap"
import ProjectTable from "../components/Tables/ProjectTable";
import TicketsChart from "../components/Charts/TicketsChart";
import API from "../utilities/API.js"
import { useAuth } from "../contexts/AuthContext"

export default function Index() {
    const [ticketsData, setTicketsData] = useState([])
    const { rootPath } = useAuth()
    const navigate = useNavigate()

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
      
      function handleChartClick(e) {
        e.preventDefault()
        navigate(`${rootPath}/tickets`)
      }

    return(
        <Container className="dashboard-container py-2" fluid>
            <ProjectTable/>
            <div className="charts-container my-3">
              <div className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart ticketsData={ticketsData} focus="status" /> 
              </div>
              <div className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart ticketsData={ticketsData} focus="priority" />
              </div>
              <div className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart ticketsData={ticketsData} focus="type" />
              </div>
            </div>
        </Container>
    )
}