import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Container, InputGroup , Col, Alert, Image, Button } from 'react-bootstrap';
import { ThemeContext } from '../index';
import { NavigationMain } from '../components/navigation/NavigationMain';
import { Footer } from '../components/footer/Footer';
import { Rating } from '../components/rating/Rating';
import { CommentBox } from '../components/comments/CommentBox';
import { SingleComment } from '../components/comments/SingleComment';
import { MovieAPI } from '../apis/MovieAPI';
import { CastAPI } from '../apis/CastAPI';
import { RatingsAPI } from '../apis/RatingsAPI';
import { BookmarksAPI } from '../apis/BookmarksAPI';
import movieNotFoundImg from '../assets/images/movie_not_found.jpeg';

export function MoviePage() {
  const { movieId } = useParams();
  const [ movie, setMovie ] = useState(null);
  const [ cast, setCast ] = useState([]);
  const [ similarMovies, setSimilarMovies ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ rating, setRating ] = useState(null);
  const { isUserLoggedIn }  = useContext(ThemeContext);
	const { userId, setUserId}  = useContext(ThemeContext);
  const [bookmarkWasAdded, setBookmarkWasAdded] = useState(false);

  const fetchMovie = async () => {
    try {
      setMovie(await MovieAPI.getById(movieId));
      setCast(await CastAPI.getAllCast(movieId));
      setSimilarMovies(await MovieAPI.getSimilar(movieId));
      setComments(await RatingsAPI.getAll(movieId));
    }
    catch (e) {
      console.error(e);
    }
  };

  const fetchOwnComment = async () => {
    try {
      if (isUserLoggedIn) {
        setRating(await RatingsAPI.getOne(movieId));
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    fetchOwnComment();
  }, [movieId, isUserLoggedIn]);

  const getDirectorName = () => {
    const director = cast.find(person => person.item3.includes('director'));
    return director ? director.item2 : 'no data';
  };

  const addBookmark = async () => {
    try {
      const bookmarkObj = {
        "userId": userId,
        "tConst": movie.tConst,
        "nConst": "",
        "bookmarkComment": "",
        "timestamp":new Date().toISOString(),
        "bookmarkId": 0
      }

      await BookmarksAPI.create(bookmarkObj);
      setBookmarkWasAdded(true);
    } catch (e) {
      console.warn("err:", e)
    }
  }

  const submitComment = async (comment, rating) => {
    try {
      await RatingsAPI.create({
        tconst: movieId,
        comment,
        rating,
      });
      setRating({ comment, rating });
    }
    catch (e) {
      console.error(e);
    }
  };

  const deleteComment = async () => {
    try {
      await RatingsAPI.delete(movieId);
      setRating(null);
    }
    catch (e) {
      console.error(e);
    }
  };

  const renderPage = () => (
    <Container className='movie__page mt-5'>
      <Row>
        <Col sm={12} md={5}>
          <Image src={movie.poster} className="poster-picture"/>
        </Col>
        <Col sm={12} md={7} className="bg-light">
          <h3>{movie.primaryTitle}</h3>
          <b>{movie.originalTitle}</b>
          <Row className="mt-4">
            <Col sm={8}>
              <div>Director: {getDirectorName()}</div>
              <div>Genres: {movie.genres.replaceAll(',', ', ')}</div>
              <div>Year: {movie.startYear}</div>
              <div>Number of votes: {movie.numVotes}</div>
              <div>Runtime: {movie.runtimeMinutes} minutes</div>
            </Col>
            <Col sm={4} className="text-end">
              <div className="mb-4">
                <b>Rating:</b>
                <Rating value={movie.averageRating}/>
                <span>{movie.numVotes} votes</span>
              </div>
              {isUserLoggedIn
                ? <div>
                  <b>Personal rating:</b>
                  <Rating value={rating ? rating.rating : null} />
                </div>
                : <div>Log in to submit a rating</div>}
            </Col>
            <Col>
                { isUserLoggedIn ?
                  <div className='mt-3'>
                    <Button onClick={addBookmark} variant='dark'>Add to bookmark</Button>
                  </div>
                : <div>Log in to save a movie to bookmark</div>
                }
                { bookmarkWasAdded ?
                  <Alert variant='success'>
                    Bookmark was added
                  </Alert>
                  : null
                }
            </Col>

          </Row>
        </Col>
      </Row>

      <p className="my-5 p-4 bg-light">{movie.plot}</p>

      <div className="my-5 py-4 bg-light text-center">
        <h4>Top Cast</h4>
        <Row className="my-4">
          {cast[0] ? <Col sm={12} md={4} className="text-center">
            <a href={'/cast/' + cast[0].item1}>{cast[0].item2}</a>
          </Col> : null}
          {cast[1] ? <Col sm={12} md={4} className="text-center">
            <a href={'/cast/' + cast[1].item1}>{cast[1].item2}</a>
          </Col> : null}
          {cast[2] ? <Col sm={12} md={4} className="text-center">
            <a href={'/cast/' + cast[2].item1}>{cast[2].item2}</a>
          </Col> : null}
        </Row>
        <Button href={"/fullcast/" + movieId}>Full cast</Button>
      </div>

      <div className="my-5 py-4 bg-light">
        <h4 className="text-center">Comments</h4>
        <div className="text-center my-2">My comment</div>
        {rating
          ? <SingleComment comment={rating} onDelete={deleteComment}></SingleComment>
          : <CommentBox onSubmit={submitComment}></CommentBox>}
        <div className="text-center my-2">All comments</div>
        {comments.items && comments.items.map((comment, index) => <SingleComment
          key={"comment-" + index}
          comment={comment}></SingleComment>)}
      </div>

      <div className="my-5 py-4 bg-light text-center">
        <h4>Similar Movies</h4>
        <Row className="my-4">
          {similarMovies.map(movie => (
            <Col key={'similarmovie-' + movie.tConst} sm={12} md={4} className="text-center">
              <a href={'/movie/' + movie.tConst}>
                <Image src={movie.poster || movieNotFoundImg} roundedCircle={true} className="d-block mx-auto mb-2 similar-movie-poster" />
                <span>{movie.primaryTitle}</span>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );

  return (
    <>
      <NavigationMain offCanvasPlacement="end"/>
      {movie ? renderPage() : <span className="text-center">Loading movie...</span>}
      <Footer/>
    </>
  );
}

export default MoviePage;
