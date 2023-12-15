import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';

const MovieList = (props) => {

	const movieGrid = 12 / (props.movies).length;
	console.log("movieGrid", props.movies)
  return (
    <Container className='bg-light movie-list__component'>
      <h2 className='text-center pb-3 pt-3'>Known for movies</h2>
      <Row>
        { props.movies.length !== 0 ?
        props.movies.map((movie) => (
          <Col key={movie.tConst} md={ movieGrid <= 6 ? movieGrid * 2  : movieGrid}  lg={movieGrid}>
            <Card>
              <Card.Img variant="top" src={movie.poster} alt={movie.name} />
              <Card.Body>
                <Card.Title>{movie.primaryTitle}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))
        : 
        <p className='text-center'>We could not find any movies for this person</p>
        }
      </Row>
    </Container>
  );
};

export default MovieList;
