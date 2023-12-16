import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import MovieList from '../components/movieList/MovieList';
import { Footer } from '../components/footer/Footer';
import movieNotFoundImg from '../assets/images/movie_not_found.jpeg';
import { NavigationMain } from '../components/navigation/NavigationMain';
import React, {useEffect, useState} from 'react';
import {CastAPI} from '../apis/CastAPI';
import { MovieAPI } from '../apis/MovieAPI';
import { CastList } from '../components/castList/CastList';
import { useHistory ,useLocation } from 'react-router-dom';


export function FullCastPage (props) {
	const location = useLocation();
	const [fullCast, setFullCast] = useState([]);
	const [isLoadedDone, setIsLoadedDone] = useState(false);
	const [movieTitle, setMovieTitle] = useState('')

	const fetchCast = async () => {
		try {
		  const pathnameurlArr = location.pathname.split('/');
		  const movieTitle = pathnameurlArr[pathnameurlArr.length - 1];
		  const result = await CastAPI.getAllCast(movieTitle);
		  setFullCast([...result]);
		  var decodedMovieTitle = decodeURIComponent(movieTitle);
		  setMovieTitle(`Full cast for movie '${decodedMovieTitle}'`);
		  console.log("result", result)
		  setIsLoadedDone(true);
		 //  setCastData(result);
		} catch (e) {
		  console.warn("ERROR", e);
		}
	  };


	useEffect(() => {
		fetchCast();
	}, [isLoadedDone])
	
	const coplayersTableHeads = ['Id', 'Name', 'Primary profession', 'Birth year'];

	return (
		<>
		<NavigationMain offCanvasPlacement="end" />
		{  isLoadedDone ?
		<CastList 
				title={movieTitle}
				tableData={fullCast} 
				tableHeads={coplayersTableHeads} 
		/>
		: null }
		<Footer/>
		</>
	)
}