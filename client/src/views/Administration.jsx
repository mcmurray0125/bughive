import { Container } from "reactstrap"
import OrganizationList from "../components/Lists/OrganizationList"
import EditUser from "../components/Forms/EditUser"

import "../assets/css/administration.css"

export default function Administration() {
    
    return(
        <Container className="admin-container py-2 gap-2" fluid>
            <OrganizationList/>
            <EditUser/>
        </Container>
    )
}