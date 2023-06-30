import {useEffect, useState} from "react";
import { Table, Card, CardHeader, CardBody, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { SyncLoader } from "react-spinners"
import moment from "moment"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import API from "../../utilities/API";
import "../../assets/css/tables.css"

export default function TicketsTable() {
    const [loading, setLoading] = useState(true);
    const [userTickets, setUserTickets] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    const { rootPath } = useAuth();

    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchUserTickets() {
          try {
            const userTicketsRes = await (
              await API.getUserTickets(abortController)
            ).json();
    
            setUserTickets(userTicketsRes);
            setLoading(false)
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

      const timeOutstanding = (timestamp) => {
        return moment(timestamp).from(moment());
      };

      let navigate = useNavigate()
      const handleLink = (projectId) => {
        navigate(`${rootPath}/project/${projectId}`);
        //TODO: useContext to navigate to appropriate layout based on user Role. Instead of hardcoding /admin
      };


      // Pagination
      useEffect(() => {
        let calculatedPages = Math.ceil(userTickets.length / 4);
        setTotalPages(calculatedPages);
      }, [userTickets]);

      useEffect(() => {
        setCurrentPage(1);
      }, [totalPages]);

      let items = [];
      const paginate = (number) => setCurrentPage(number);
  
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <PaginationItem key={number} active={currentPage === number} onClick={() => paginate(number)}>
            <PaginationLink>
            {number}
            </PaginationLink>
          </PaginationItem>
        );
      }


    if (loading) {
        return (
          <div className="loading-wrapper d-flex gap-2">
            <h2 style={{color:"#372c62"}}>Loading</h2>
            <SyncLoader color="#372c62" />
          </div>
          );
    }
          
    return(
        <Card className="table-wrapper bg-white">
          <CardHeader>
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title ms-1">Tickets</p>
            </div>
          </CardHeader>
          <CardBody className="p-3">
            {userTickets.length > 0
            ?
            <Table striped responsive className="table-1 m-0">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Ticket</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {userTickets.slice(startIndex, endIndex).map((ticket) => {
                        return(
                            <tr
                                key={ticket.id}
                                id={ticket.id}
                                onClick={() => handleLink(ticket.project_id)}
                                className="ticket-row"
                            >
                                <td >
                                    {ticket.project_name}
                                </td>
                                <td>{ticket.title}</td>
                                <td>{ticket.status}</td>
                                <td>{timeOutstanding(ticket.created_at)}</td>
                                <td>{ticket.priority}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            :
            <div className="m-2">
              <p>You have not opened any tickets</p>
              <p>Visit a <Link to={`${rootPath}/index`}>project</Link> to create a new ticket</p>
            </div>
            }
          </CardBody>
          <Pagination className='w-100 d-flex justify-content-center'>
            {items}
          </Pagination>
        </Card>
    )
}