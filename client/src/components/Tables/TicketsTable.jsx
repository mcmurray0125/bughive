import {useEffect, useState} from "react";
import { Table, Button, Media } from "reactstrap"
import moment from "moment"
import { useNavigate } from "react-router-dom";

import API from "../../utilities/API";
import "../../assets/css/tables.css"

export default function TicketsTable() {
    const [loading, setLoading] = useState(true);
    const [userTickets, setUserTickets] = useState([{}]);

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
        navigate(`/admin/project/${projectId}`);
        //TODO: useContext to navigate to appropriate layout based on user Role. Instead of hardcoding /admin
      };

    if (loading) {
        return (
            <>
              <h2>Loading Tickets...</h2>
            </>
          );
    }
          
    return(
        <>
        <div className="table-wrapper p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title">Tickets</p>
            </div>
            <Table className="tickets-table m-0">
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
                    {userTickets.map((ticket) => {
                        return(
                            <tr
                                key={ticket.id}
                                id={ticket.id}
                                onClick={() => handleLink(ticket.project_id)}
                                className="ticket-row"
                            >
                                <td className="fw-bold">
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
        </div>
        </>
    )
}