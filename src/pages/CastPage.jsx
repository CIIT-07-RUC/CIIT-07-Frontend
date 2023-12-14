import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import MovieList from '../components/movieList/MovieList';
import { Footer } from '../components/footer/Footer';
import img1 from '../assets/images/movie2.jpeg';
import { NavigationMain } from '../components/navigation/NavigationMain';
import React, {useEffect, useState} from 'react';
import {CastAPI} from '../apis/CastAPI';
import { useHistory ,useLocation } from 'react-router-dom';

export function CastPage(props) {
	const location = useLocation()

	const [castData, setCastData] = useState({});
	const fetchCast = async () => { 
		try {
			const pathnameurlArr = location.pathname.split('/')
			const castId = pathnameurlArr[pathnameurlArr.length - 1];
			// nm0000017
			const result = await CastAPI.getById(castId);
			setCastData(result);
			console.log("GET RESULT", );
		} catch (e) {
			console.warn("ERROR", e)
		}
	}

	useEffect(() => {
		fetchCast();
	}, [])
	

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
					<p><strong> {castData.birthyear} { castData.birthyear !== null  ? <span>- {castData.birthyear} </span>  :   null } </strong></p>
				</div>
				<h1>{castData.knownfortitles}</h1>
				<MovieList movies={mockedMovies} />
				</Container>
			</div>
			<Footer/>

		</>
	)
}