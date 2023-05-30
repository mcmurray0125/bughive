import { useEffect, useState } from 'react'
import { Card, CardHeader, List, ListGroupItem, Badge, Row, Col } from 'reactstrap'
import API from '../../utilities/API';

export default function SelectedTicket({projectId, selectedTicket, selectedTicketId, setSelectedTicket}) {
    const [assignedDevs, setAssignedDevs] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchTicket() {
          try {
            if (selectedTicketId) {
              const ticket = await API.getTicket(
                projectId,
                selectedTicketId,
                abortController
              );
              setSelectedTicket(ticket);
              const comments = await API.getTicketComments(
                selectedTicketId,
                abortController
              );
              setComments(comments);
    
              //Get users assigned to the ticket.
              const assignedDevs = await API.getDevAssignments(
                selectedTicketId,
                abortController
              );
              setAssignedDevs(assignedDevs);
            }
          } catch (err) {
            if (!abortController.signal.aborted) {
              console.log(`Error requesting project data: ${err}`);
            }
          }
        }
    
        fetchTicket();
    
        return () => {
          abortController.abort();
        };
      }, [selectedTicketId, projectId]);

      return (
        <Card className='mt-4'>
          <CardHeader>
            <h5 className='m-0'>Selected Ticket Info</h5>
          </CardHeader>
          {Object.keys(selectedTicket).length === 0 ? (
            <p className='m-3'>No Ticket Selected</p>
          ) : (
            <Card className='p-3'>
              <Row className='selected-ticket-info mb-4'>
                <Col md="3">
                  <h6>Ticket Title</h6>
                  <h5>{selectedTicket.title}</h5>
                </Col>
                <Col md="3">
                  <h6>Creator</h6>
                  <h5>{selectedTicket.first_name} {selectedTicket.last_name}</h5>
                </Col>
                <Col md="6">
                  <h6>Description</h6>
                  <h5>{selectedTicket.description}</h5>
                </Col>
              </Row>

              <Row className='selected-ticket-info'>
                <Col md="3" sm="12">
                  <h6>Status</h6>
                  <Badge pill>{selectedTicket.status.toUpperCase()}</Badge>
                </Col>
                <Col md="3" sm="12">
                  <h6>Priority</h6>
                  <Badge pill>{selectedTicket.priority.toUpperCase()}</Badge>
                </Col>
                <Col md="3" sm="12">
                  <h6>Type</h6>
                  <Badge pill>{selectedTicket.type.toUpperCase()}</Badge>
                </Col>
                <Col md="3">
                  <h6>Time Estimate <small>(Hours)</small></h6>
                  <h5>{selectedTicket.time_estimate}</h5>
                </Col>
              </Row>
              <hr />
              <List type='unstyled' className='m-0'>
                <h6>Assigned Users</h6>
                {assignedDevs.length === 0 ? (
                  <ListGroupItem>No users assigned</ListGroupItem>
                ) : (
                  assignedDevs.map((dev, index) => (
                    <ListGroupItem key={index} disabled className='fs-5'>
                      {dev.first_name} {dev.last_name}
                    </ListGroupItem>
                  ))
                )}
              </List>
            </Card>
          )}
        </Card>
      );
}
