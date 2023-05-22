import { Container } from "reactstrap"
import TicketsTable from "../components/Tables/TicketsTable"

export default function Tickets() {
    
    return(
        <Container className="dashboard-container py-2" fluid>
            <TicketsTable/>
        </Container>
    )
}