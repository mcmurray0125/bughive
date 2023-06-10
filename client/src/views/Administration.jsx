import { useState, useEffect } from "react"
import { Container } from "reactstrap"
import { SyncLoader } from "react-spinners"
import OrganizationList from "../components/Lists/OrganizationList"
import EditUser from "../components/Forms/EditUser"
import API from "../utilities/API";

import "../assets/css/administration.css"

export default function Administration() {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        const fetchOrganization = async () => {
            try {
            const organization = await API.getUsers(abortController);
            setAllUsers(organization);
            setLoading(false);
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

    //If user clicks outside the admin-container, selectedUser is reset.
    useEffect(() => {
        const handleClickOutside = (event) => {
          const containerElement = document.querySelector(".admin-container");
          if (
            containerElement &&
            !containerElement.contains(event.target)
          ) {
            setSelectedUser({
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                role: "",
              });
          }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);

    const props = {allUsers, setAllUsers, selectedUser, setSelectedUser}
    
  if (loading) {
    return (
    <div className="loading-wrapper d-flex gap-2 m-4">
        <h2 style={{color:"#372c62", zIndex: "5"}}>Loading</h2>
        <SyncLoader color="#372c62" />
    </div>
    );
  }

    return(
        <Container className="admin-container py-2 gap-2" fluid>
            <OrganizationList props={props}/>
            <EditUser props={props}/>
        </Container>
    )
}