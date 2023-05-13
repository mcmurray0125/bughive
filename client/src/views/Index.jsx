import React from "react";
import ProjectTable from "../components/Tables/ProjectTable";
import { Container } from "reactstrap"

export default function Index() {
    
    return(
        <Container className="dashboard-container py-2" fluid>
            <ProjectTable/>
        </Container>
    )
}