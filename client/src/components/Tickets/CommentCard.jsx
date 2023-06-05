import React from 'react'
import { Card, CardTitle, Button, CardText } from "reactstrap"
import moment from "moment"

export default function CommentCard({ comment, deleteComment }) {
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
                onClick={() => {deleteComment(comment.id)}}
                >
                    <i className="fas fa-trash-alt"></i>
                </Button>
            </div>
        </CardTitle>
        <CardText className="ml-1">
        {comment.comment}
        </CardText>
    </Card>
  )
}
