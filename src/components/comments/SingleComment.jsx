import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Rating } from '../rating/Rating';
import './index.scss'

export function SingleComment({ comment, onDelete }) {
  const timestamp = new Date(comment.timestamp).toLocaleString()

  return (
    <Card className="comment-form mb-2">
      <Card.Body>
        <Card.Text>{comment.comment}</Card.Text>
        <Row>
          <Col sm={12} md={6}>
            <Rating value={comment.rating}></Rating>
          </Col>
          <Col sm={12} md={6} className="text-end">{timestamp}</Col>
        </Row>
        {onDelete ? <Button onClick={onDelete} className="mt-2">Delete comment</Button> : null}
      </Card.Body>
    </Card>
  );
}

export default SingleComment;
