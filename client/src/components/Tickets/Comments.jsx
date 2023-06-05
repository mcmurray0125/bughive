import { useState, useEffect } from "react"
import { Card, CardHeader, CardText, CardTitle, Row, Input, Button, Form } from "reactstrap"
import { ToastContainer, toast } from "react-toastify"
import API from "../../utilities/API";

import CommentCard from "./CommentCard";
import CreateComment from "./CreateComment";

export default function Comments({ selectedTicket, selectedTicketId, projectId}) {
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
    }
    
    const deleteComment = async (commentId) => {
      try {
        await API.deleteComment(selectedTicket.id, commentId);
  
        const comments = await API.getTicketComments(selectedTicket.id);
        setComments(comments);

        toast.success(`Comment Removed`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.log("Error deleting comment", err);
      }
    }
    
    const handleCommentSubmit = async (e) => {
      e.preventDefault();
  
      if (isSubmitting) return;
  
      setIsSubmitting(true);
  
      try {
        await API.createComment(selectedTicket.id, { comment });
  
        const comments = await API.getTicketComments(selectedTicket.id);
        setComments(comments);

        toast.success(`Comment added to ticket: ${selectedTicket.title}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.log("Error posting comment", err);
      }
  
      setIsSubmitting(false);
      setComment("");
    }

  return (
    <Card>
        <CardHeader className="bg-white">
            <h4 className="m-0">Comments</h4>
        </CardHeader>
        {comments.length === 0 ? <h6>No Comments</h6> :
        comments.map((comment) => {
            return (
              <CommentCard
                comment={comment}
                deleteComment={deleteComment}
                key={comment.id}
              />
            )
        })
        }
        <Row className="m-3">
          <CreateComment 
            handleCommentSubmit={handleCommentSubmit}
            handleCommentChange={handleCommentChange}
            comment={comment}
          />
        </Row>
        <ToastContainer/>
    </Card>
  )
}
