import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';

const PersonList = (props) => {
    console.log("props.movies", props.movies)
	const movieGrid = 12 / (props.movies).length;
	console.log("movieGrid", movieGrid)
  return (
    <Container className='bg-light movie-list__component'>
      
      <Row>
        {props.movies.map((movie) => (
          <Col key={movie.id} md={ movieGrid <= 6 ? movieGrid * 2  : movieGrid}  lg={movieGrid}>
            <Card>
              
              <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PersonList;
