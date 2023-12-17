import React from 'react';
import { Container, Row, Col, Card, Image, Button, Text } from 'react-bootstrap';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';

const TitleList = (props) => {
  console.log("props.movies", props.movies)
	const movieGrid = 12 / (props.movies).length;
	console.log("movieGrid", movieGrid)
  
  return (
    <Container className='bg-light movie-list__component'>
      
      <Col>
        {props.movies.map((movie) => (
          <Col key={movie.id} sm={5} md={3}> 
            <Card>
              <Card.Body>
                <Card.Title>{movie.name}  </Card.Title>
                <Card.Text /> {movie.year} <Card.Text/>
                <Card.Img  src={movie.poster} className="poster-picture"/>
                <Button href={`/movie/${movie.tConst}`} >Check movie</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Col>
    </Container>
  );
};

export default TitleList;
