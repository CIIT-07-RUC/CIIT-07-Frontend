import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Rating } from '../rating/Rating';
import './index.scss'

export function CommentBox({ onSubmit }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(comment, rating);
  }

  return (
    <Form className="comment-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="commentForm.comment">
        <Form.Label>Write a comment</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={e => setComment(e.target.value)} />
      </Form.Group>

      <div className="mb-4">
        <Form.Label>Rate the movie</Form.Label>
        <Rating value={rating} onClick={value => setRating(value)}></Rating>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default CommentBox;
