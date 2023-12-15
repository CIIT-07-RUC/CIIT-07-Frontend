import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import MovieList from '../components/movieList/MovieList';
import { Footer } from '../components/footer/Footer';
import img1 from '../assets/images/movie2.jpeg';
import { NavigationMain } from '../components/navigation/NavigationMain';
import React, {useEffect, useState} from 'react';
import {CastAPI} from '../apis/CastAPI';
import { MovieAPI } from '../apis/MovieAPI';

import { useHistory ,useLocation } from 'react-router-dom';

export function CastPage(props) {
	const location = useLocation()

	const [castData, setCastData] = useState({});

	const [castMovieData, setCastMovieData] = useState([{}]);
	const fetchCast = async () => {
		try {
		  const pathnameurlArr = location.pathname.split('/');
		  const castId = pathnameurlArr[pathnameurlArr.length - 1];
		  const result = await CastAPI.getById(castId);
		  setCastData(result);
		} catch (e) {
		  console.warn("ERROR", e);
		}
	  };

	  const fetchCastMovie = async () => {
		try {
		  let knownForTitlesArr;
		  if (castData.knownfortitles !== null || castData !== null) {
			knownForTitlesArr = castData.knownfortitles.split(',');
		  }
		  const moviesData = await Promise.all(
			knownForTitlesArr.map(async (el) => {
			  const castMovie = await MovieAPI.getById(el);
			  return castMovie !== 'Not Found Movie' ? castMovie : null;
			})
		  );
		  const validMoviesData = moviesData.filter((movie) => movie !== null);
	  
		  setCastMovieData([ ...validMoviesData]);
		} catch (error) {
		  console.error('Error fetching cast movie data:', error);
		}
	  };
	  
	  
	  useEffect(() => {
		fetchCast();
	  }, []);
	  
	  useEffect(() => {
		if (Object.entries(castData).length !== 0) {
		  fetchCastMovie();
		}
	  }, [castData]);
	  
  


	const mockedMovies = [
		{ id: 1, name: 'Movie 1', image: img1},
		{ id: 2, name: 'Movie 2', image: img1 },
		{ id: 3, name: 'Movie 3', image: img1},
		{ id: 4, name: 'Movie 4', image: img1 },
	];

	return(
		<>
			<NavigationMain offCanvasPlacement="end" />
			<div className="cast__page pb-5">
				<Container> 

				<div className="cast__page--top-section bg-light">
					<h1>{castData.primaryname}</h1>
					<p>Primary profession: {castData.primaryprofession} <strong></strong></p>
					<p><strong> {castData.birthyear} { castData.deathyear  !== ""  ? <span>- {castData.deathyear} </span>  :   null } </strong></p>
				</div>
				</Container>
			</div>
			<MovieList movies={castMovieData} />
			<Footer/>

		</>
	)
}