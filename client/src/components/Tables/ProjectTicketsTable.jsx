import {useEffect, useState} from "react";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardBody
    } from "reactstrap"
import API from "../../utilities/API";

import "../../assets/css/tables.css"
import CreateTicket from "../Forms/CreateTicket";
import EditTicket from "../Forms/EditTicket";

export default function ProjectTicketsTable
    ({   
        projectTickets,
        setProjectTickets,
        setSelectedTicketId,
        selectedTicket,
        setSelectedTicket,
        projectId,
        projectTeam,
        assignedDevs,
        selectedTicketId
    })
    {

    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [showEditTicketModal, setShowEditTicketModal] = useState(false);

    const toggleEditTicket = () => setShowEditTicketModal(!showEditTicketModal);
    const toggleNewTicket = () => setShowNewTicketModal(!showNewTicketModal);

    const deleteTicket = async (ticketId) => {
        await API.deleteTicket(projectId, ticketId);
        setSelectedTicketId(null)
        setSelectedTicket({})
    
        const projectTicketsRes = await API.getProjectTickets(projectId);
        setProjectTickets(projectTicketsRes);
      };

    const getActive = (ticketId) => {
        if (ticketId === selectedTicketId) {
            return "active-ticket"
        }
    }

    return(
        <>
        <Card className="table-wrapper project-tickets-wrapper bg-white">
            <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="dashboard-card-title">Tickets</p>
                    <Button
                    className="new-project-btn"
                    onClick={toggleNewTicket}
                    >
                        New Ticket
                    </Button>
                </div>
            </CardHeader>
            <Modal isOpen={showNewTicketModal} sz="sm">
                <ModalHeader toggle={toggleNewTicket}>Create a New Ticket</ModalHeader>
                <CreateTicket
                    team={projectTeam}
                    projectId={projectId}
                    toggle={toggleNewTicket}
                    setProjectTickets={setProjectTickets}
                />
            </Modal>
            <CardBody className="p-2">
            {projectTickets.length === 0 ? 
                <p className="m-0 mt-3 ps-2">No Tickets Found</p>
                :
                <Table className="project-tickets-table table-1 m-0">
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
                                <tr key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)} id={ticket.id} className={getActive(ticket.id)}>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.first_name} {ticket.last_name}</td>
                                    <td className="d-flex justify-content-center align-items-center projects-more">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={() => {
                                                setSelectedTicketId(ticket.id);
                                            }}
                                        >
                                        <i className="fa-solid fa-ellipsis-vertical project-ellipsis"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" end>
                                            <DropdownItem onClick={toggleEditTicket}>
                                                Edit Ticket
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem
                                                onClick={() => {
                                                deleteTicket(ticket.id);
                                                }}
                                            >
                                                Remove Ticket
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    </td>
                                </tr>
                            )
                        })
                        }

                        <Modal isOpen={showEditTicketModal} toggle={toggleEditTicket}>
                            <ModalHeader toggle={toggleEditTicket}>Edit Ticket</ModalHeader>
                            <EditTicket
                                team={projectTeam}
                                ticketData={selectedTicket}
                                toggle={toggleEditTicket}
                                setProjectTickets={setProjectTickets}
                                assignedDevs={assignedDevs}
                            />
                        </Modal>
                    </tbody>
                </Table>
            }
            </CardBody>
        </Card>
        </>
    )
}