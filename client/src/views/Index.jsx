import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap"
import ProjectTable from "../components/Tables/ProjectTable";
import TicketsChart from "../components/Charts/TicketsChart";
import API from "../utilities/API.js"
import { useAuth } from "../contexts/AuthContext"

export default function Index() {
    const { rootPath } = useAuth()
    const navigate = useNavigate()
      
      function handleChartClick(e) {
        e.preventDefault()
        navigate(`${rootPath}/tickets`)
      }

    return(
        <Container className="dashboard-container py-2" fluid>
            <ProjectTable/>
            <div className="charts-container my-3">
              <div className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart focus="status" /> 
              </div>
              <div className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart focus="priority" />
              </div>
              <div className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart focus="type" />
              </div>
            </div>
        </Container>
    )
}