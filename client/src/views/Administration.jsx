import { useState, useEffect } from "react"
import { Container } from "reactstrap"
import OrganizationList from "../components/Lists/OrganizationList"
import EditUser from "../components/Forms/EditUser"
import API from "../utilities/API";

import "../assets/css/administration.css"

export default function Administration() {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      role: "",
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchOrganization = async () => {
            try {
            const organization = await API.getUsers(abortController);
            setAllUsers(organization);
            } catch (err) {
            if (!DOMException) {
                console.log(err);
            }
            }
        };

        fetchOrganization();
        return () => {
            abortController.abort();
        };
    }, []);

    const props = {allUsers, setAllUsers, selectedUser, setSelectedUser}
    
    return(
        <Container className="admin-container py-2 gap-2" fluid>
            <OrganizationList props={props} />
            <EditUser props={props}/>
        </Container>
    )
}