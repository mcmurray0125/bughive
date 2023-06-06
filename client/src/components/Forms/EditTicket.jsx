import { useState, useMemo } from 'react'
import useForm from "../../utilities/formValidation/useForm";
import validate from "../../utilities/formValidation/ticketValidation";
import { useParams } from "react-router-dom";
import API from '../../utilities/API';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from "reactstrap";

export default function EditTicket({ team, ticketData, assignedDevs, setProjectTickets, toggle }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const projectId = useParams().id;

    const initialTicketValues = useMemo(() => {
        return {
          title: ticketData.title || "",
          description: ticketData.description || "",
          assignees: assignedDevs.map((dev) => dev.user_id) || [],
          priority: ticketData.priority || "low",
          type: ticketData.type || "issue",
          status: ticketData.status || "new",
          timeEstimate: ticketData.time_estimate || 0,
        };
    }, [
        ticketData.title,
        ticketData.description,
        assignedDevs,
        ticketData.priority,
        ticketData.type,
        ticketData.status,
        ticketData.time_estimate,
    ]);
    
      const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        initialTicketValues,
        validate
      );

      async function submit() {
        if (isSubmitting) return;
    
        setIsSubmitting(true);
    
        const { assignees } = values;
        try {
          await API.updateTicket(projectId, ticketData.id, values);
          await API.removeAllDevAssignments(ticketData.id);
    
          for (let i = 0; i < assignees.length; i++) {
            const devId = { devId: assignees[i] };
            await API.createDevAssignment(ticketData.id, devId);
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
        } catch (err) {
          console.log(err);
        }
      }

  return (
    <Container className='p-3' fluid>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="title"> Title </Label>
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
                <Label htmlFor="assignees">Assign Devs</Label>
                <Input
                    type="select"
                    name="assignees"
                    id="assignees"
                    value={values.assignees}
                    onChange={handleChange}
                    multiple
                >
                {team.map((dev, key) => (
                    <option id={dev.user_id} key={key} value={dev.user_id}>
                    {dev.first_name} {dev.last_name}
                    </option>
                ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="timeEstimate">Time Estimate (Hours)</Label>
                <Input
                    type="number"
                    min="0"
                    step="0.5"
                    name="timeEstimate"
                    id="timeEstimate"
                    value={values.timeEstimate}
                    onChange={handleChange}
                ></Input>
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
                <Label htmlFor="type">Status</Label>
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

            <Button color="success" type="submit">
                Submit
            </Button>
        </Form>
    </Container>
  )
}
