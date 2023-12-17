import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';
import Accordion from 'react-bootstrap/Accordion';
import React, {useEffect, useState, useRef} from 'react';
import MovieAPI from '../../apis/MovieAPI';
import BookmarksAPI from '../../apis/BookmarksAPI';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';

export function BookmarkCard(props){
	const bookmark = props.item;
	const [movie, setMovie] = useState([]);
	const movieBookmarkRef = useRef(null)
	const [isMovieLoaded, setIsMovieLoaded] = useState(false);
	const [bookmarkComment, setBookmarkComment] = useState('');
	const [commentWasAdded, setCommentWasAdded] = useState(false);


	const fetchMovie = async () => {
		try {
			const result = await MovieAPI.getById(bookmark.tConst);
			setMovie(result);
			setIsMovieLoaded(true);
		  } catch (e) {
			console.warn("err:", e);
		  }
		
	}

	const removeBookmark = async () => {
		try {
			await BookmarksAPI.delete(bookmark.bookmarkId);
			const currItem = movieBookmarkRef.current;
			currItem.remove();
		  } catch (e) {
			console.warn("err:", e);
		  }

	}

	const addBookmarkComment = async (e) => {
		e.preventDefault();
		try {
			const bookmarkUpdated = {
				"userId": bookmark.userId,
				"tConst": bookmark.tConst,
				"nConst": bookmark.nConst,
				"bookmarkComment": bookmarkComment,
				"timestamp": bookmark.timestamp,
				"bookmarkId": bookmark.bookmarkId
			  }
			await BookmarksAPI.update(bookmark.bookmarkId, bookmarkUpdated);
			setCommentWasAdded(true);
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
	<Card className='card__item mt-3' ref={movieBookmarkRef}>
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
						<Form onSubmit={e => addBookmarkComment(e)}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Form.Label>Write comment to bookmark</Form.Label>
								<Form.Control as="textarea" onChange={e => setBookmarkComment(e.target.value)} />
							</Form.Group>
							<Button type="submit">
								Submit
							</Button>
						</Form>
						{ commentWasAdded ? 
							<Alert className='mt-2' variant='success'>
								Comment was successfully added, please refresh page
							</Alert>
						: null}
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Other actions </Accordion.Header>
					<Accordion.Body>
						<Button 
							className='mb-2'
							onClick={removeBookmark}
							variant='danger'>
							Remove bookmark
						</Button>
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