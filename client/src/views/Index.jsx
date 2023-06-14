import { useNavigate } from "react-router-dom";
import { Container, Card } from "reactstrap"
import ProjectTable from "../components/Tables/ProjectTable";
import TicketsChart from "../components/Charts/TicketsChart";
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
            <div className="charts-container my-5">
              <Card className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart focus="status" /> 
              </Card>
              <Card className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart focus="priority" />
              </Card>
              <Card className="chart-wrapper card" onClick={handleChartClick}>
                <TicketsChart focus="type" />
              </Card>
            </div>
        </Container>
    )
}