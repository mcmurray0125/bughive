import {useEffect, useState} from "react";
import { Table, Button } from "reactstrap"
import { Link } from "react-router-dom"

import "../../assets/css/tables.css"

export default function ProjectTicketsTable({projectTickets}) {
          
    return(
        <>
        <div className="table-wrapper p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title">Tickets</p>
                <Button className="new-project-btn">New Ticket</Button>
            </div>
            <Table hover className="projects-table m-0">
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
                            <tr key={ticket.id}>
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
        </div>
        </>
    )
}