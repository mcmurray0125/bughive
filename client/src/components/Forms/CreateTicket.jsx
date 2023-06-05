import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap"

import useForm from "../../utilities/formValidation/useForm";
import validate from "../../utilities/formValidation/ticketValidation";
import API from "../../utilities/API";

export default function CreateTicket({ toggle, setProjectTickets, team }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const projectId = useParams().id;

    const initialTicketValues = {
      title: "",
      description: "",
      assignees: [],
      priority: "low",
      type: "issue",
      status: "new",
      timeEstimate: 0,
    };

    const { handleChange, handleSubmit, values, errors } = useForm(
      submit,
      initialTicketValues,
      validate
    );

    async function submit() {
      if (isSubmitting === true) return;
  
      setIsSubmitting(true);
  
      const { assignees } = values;
  
      const { id } = await API.createTicket(projectId, values);
  
      for (let i = 0; i < assignees.length; i++) {
        const devId = { devId: assignees[i] };
        await API.createDevAssignment(id, devId);
      }
  
      const projectTicketsRes = await API.getProjectTickets(projectId);
  
      setProjectTickets(projectTicketsRes);
  
      values.title = "";
      values.description = "";
      values.assignees = [];
      values.priority = "low";
      values.type = "issue";
      values.status = "new";
      values.timeEstimate = 0;
  
      toggle();
  
      setIsSubmitting(false);
    }

  return (
    <Container className="p-2">
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter ticket title"
                  value={values.title}
                  onChange={handleChange}
                />
              {errors.title && (
                <div style={{ fontSize: 12, color: "red" }}>{errors.title}</div>
              )}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ticketDescription">Ticket Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="ticketDescription"
                  placeholder="Enter description"
                  value={values.description}
                  onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="assignees" className='m-1'>Assign Members</Label>
                <Input
                  type="select"
                  name="assignees"
                  id="assignees"
                  value={values.assignees}
                  onChange={handleChange}
                  multiple
                >
                {team.map((user, index) => {
                    return (
                    <option key={index} id={user.user_id} value={user.user_id}>
                        {user.first_name} {user.last_name}
                    </option>
                    );
                })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="timeEstimate">Time Estimate (Hours)</Label>
                <Input
                  type="number"
                  name="timeEstimate"
                  id="timeEstimate"
                  value={values.timeEstimate}
                  onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={values.type}
                  onChange={handleChange}
                >
                  <option>issue</option>
                  <option>bug</option>
                  <option>error</option>
                  <option>feature request</option>
                  <option>other</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="type">Priority</Label>
                <Input
                  type="select"
                  name="priority"
                  id="priority"
                  value={values.priority}
                  onChange={handleChange}
                >
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                  <option>immediate</option>
                </Input>
            </FormGroup>
            <FormGroup>
              <Label for="type">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={values.status}
                onChange={handleChange}
              >
                <option>new</option>
                <option>open</option>
                <option>in progress</option>
                <option>resolved</option>
                <option>more info required</option>
              </Input>
            </FormGroup>

            <Button type="submit" color="success" className="mt-4">
                    Create
            </Button>
        </Form>
    </Container>
  )
}
