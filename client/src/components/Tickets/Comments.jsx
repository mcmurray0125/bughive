import { useState, useEffect } from "react"
import { Card, CardHeader, CardText, CardTitle, Row, Input, Button, Form } from "reactstrap"
import API from "../../utilities/API";
import moment from "moment"

export default function Comments({ selectedTicket,selectedTicketId, projectId}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchComments() {
          try {
            if (selectedTicketId) {
              const comments = await API.getTicketComments(
                selectedTicketId,
                abortController
              );
              setComments(comments);
            }
          } catch (err) {
            if (!abortController.signal.aborted) {
              console.log(`Error requesting project data: ${err}`);
            }
          }
        }
    
        fetchComments();
    
        return () => {
          abortController.abort();
        };
      }, [selectedTicketId, projectId]);

    const handleCommentChange = (e) => {
        let { value } = e.target;
    
        setComment(value);
      };
    
      const deleteComment = async (commentId) => {
        try {
          await API.deleteComment(selectedTicket.id, commentId);
    
          const comments = await API.getTicketComments(selectedTicket.id);
          setComments(comments);
        } catch (err) {
          console.log("Error deleting comment", err);
        }
      };
    
      const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        if (isSubmitting) return;
    
        setIsSubmitting(true);
    
        try {
          await API.createComment(selectedTicket.id, { comment });
    
          const comments = await API.getTicketComments(selectedTicket.id);
          setComments(comments);
        } catch (err) {
          console.log("Error posting comment", err);
        }
    
        setIsSubmitting(false);
        setComment("");
      };

  return (
    <Card>
        <CardHeader className="bg-white">
            <h4 className="m-0">Comments</h4>
        </CardHeader>
        {comments ? (
        comments.map((comment) => {
            return (
            <Card body className="p-3 mx-3 my-2" key={comment.id}>
                <CardTitle >
                    <div className="d-flex justify-content-between mb-0">
                        <div>
                            <strong>
                                {comment.first_name} {comment.last_name} -{" "}
                            </strong>
                            <small >
                                {moment(comment.created_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                                )}
                            </small>{" "}
                        </div>

                        <Button
                        className="p-1 bg-none"
                        color="danger"
                        size="sm"
                        onClick={() => {
                            deleteComment(comment.id);
                        }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                </CardTitle>
                <CardText className="ml-1">
                {comment.comment}
                </CardText>
            </Card>
            );
        })
        ) : (
        <></>
        )}
        <Row className="m-3">
        <Form
            className="input-group"
            onSubmit={handleCommentSubmit}
        >
            <Input
            id="comment"
            type="text"
            name="comment"
            placeholder="Enter comment"
            value={comment}
            onChange={handleCommentChange}
            />
            <div className="input-group-append">
            <Button type="submit" color="primary">
                Comment
            </Button>
            </div>
        </Form>
        </Row>
    </Card>
  )
}
