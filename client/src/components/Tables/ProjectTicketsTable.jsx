import {useEffect, useState} from "react";
import { Table, Button } from "reactstrap"
import { Link } from "react-router-dom"

import "../../assets/css/tables.css"

export default function ProjectTicketsTable({projectTickets, setSelectedTicketId}) {
          
    return(
        <>
        <div className="table-wrapper project-tickets-wrapper p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title">Tickets</p>
                <Button className="new-project-btn">New Ticket</Button>
            </div>
            {projectTickets.length === 0 ? 
                <p className="m-0 mt-3 ps-2">No Tickets Found</p>
                :
                <Table hover className="table-1 m-0">
                    <thead>
                        <tr>
                            <th>Ticket Title</th>
                            <th>Description</th>
                            <th>Ticket Creator</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {projectTickets.map((ticket) => {
                            return(
                                <tr key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)}>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.first_name} {ticket.last_name}</td>
                                    <td className="d-flex justify-content-center align-items-center projects-more">
                                        <i className="fa-solid fa-ellipsis-vertical project-ellipsis"></i>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            }
        </div>
        </>
    )
}