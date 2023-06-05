import React from 'react'
import { Form, Input, Button } from "reactstrap"

export default function CreateComment({ handleCommentChange, handleCommentSubmit, comment }) {
  return (
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
        <Button
          type="submit"
          color="primary"
          disabled={comment === "" ? true : false}
        >
            Comment
        </Button>
    </Form>
  )
}
