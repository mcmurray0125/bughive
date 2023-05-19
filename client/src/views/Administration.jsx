import { Container } from "reactstrap"
import OrganizationList from "../components/Lists/OrganizationList"

export default function Administration() {
    
    return(
        <Container className="dashboard-container py-2" fluid>
            <OrganizationList/>
        </Container>
    )
}