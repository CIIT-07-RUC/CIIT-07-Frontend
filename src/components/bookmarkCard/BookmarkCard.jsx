import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';
import Accordion from 'react-bootstrap/Accordion';
import React, {useEffect, useState} from 'react';
import MovieAPI from '../../apis/MovieAPI';

export function BookmarkCard(props){
	const bookmark = props.item;

	const [movie, setMovie] = useState([]);
	const [isMovieLoaded, setIsMovieLoaded] = useState(false);

	const fetchMovie = async () => {
		try {
			console.log("bookmark.tConst", bookmark.tConst)
			const result = await MovieAPI.getById(bookmark.tConst);
			setMovie(result);
			setIsMovieLoaded(true);
			console.log("MOVIE", result)
		  } catch (e) {
			console.warn("err:", e);
		  }
		
	}
	useEffect(() => {
		fetchMovie()
	}, []);
	
	const addedDate = new Date(bookmark.timestamp).toLocaleDateString('da-DK');
	return(
	<>
	<Card className='card__item mt-3'>
		<Card.Img 
		className="card__item--image"
		variant="top" 
		src={movie.poster} />
		<Card.Body className="card__body">
			<Card.Title className='text-center' >{movie.primaryTitle} </Card.Title>
			<Card.Text className='text-center' style={{fontStyle: 'italic'}}>
				Added: {addedDate}
			</Card.Text>
			<Card.Text>
			<Accordion >
				<Accordion.Item eventKey="0">
					<Accordion.Header>Your bookmark comment</Accordion.Header>
					<Accordion.Body>
						{bookmark.bookmarkComment}
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Add comment to bookmark </Accordion.Header>
					<Accordion.Body>
					
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Other actions </Accordion.Header>
					<Accordion.Body>
						<Button className='mb-2' variant='danger'>Remove bookmark</Button>
						<Button variant='warning'>Update bookmark</Button>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			</Card.Text>
			<Button href={`/movie/${movie.tConst}`} >Check movie</Button>
		</Card.Body>
				
	</Card>
	</>
	);
}