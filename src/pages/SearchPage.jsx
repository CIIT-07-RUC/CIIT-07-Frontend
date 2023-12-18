import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import img1 from '../assets/images/404_image.png';
import { NavigationMain } from '../components/navigation/NavigationMain';
import { Footer } from '../components/footer/Footer';
import MovieList from '../components/movieList/MovieList';
import PersonList from '../components/searchResultsList/PersonList';
import TitleList from '../components/searchResultsList/TitleList';
import { useParams } from 'react-router';
import { SearchAPI } from '../apis/SearchAPI';
import { useState, useEffect } from 'react';

export function SearchPage(props) {

	const mockedPersons = [
		{ id: 1, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
		{ id: 2, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
		{ id: 3, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
		{ id: 4, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
	];
	const mockedMovies = [
		{ id: 1, primaryTitle: 'Movie 1', tConst: 'tt4285496', poster: img1, StartYear: '2015'},
		{ id: 2, primaryTitle: 'Movie 2', tConst: 'tt4285496', poster: img1, StartYear: '2015'},
		{ id: 3, primaryTitle: 'Movie 3', tConst: 'tt4285496', poster: img1, StartYear: '2015'},
	
	];

	const params = useParams();
	const searchQuery = params.query;

	let personsArr = [];
	let titlesArr = [];
	const [ titles, setTitles ] = useState([]);
	const [ persons, setPersons ] = useState([]);
	
	const fetchResults = async () => {
		try {
			const titleResultsData = (
				titlesArr.map(async (movie) => {
				  const titles = await SearchAPI.searchByTitle(movie);
				  return titles;
				})
			);

			setTitles([titleResultsData]);

		} catch (e) {
		  console.error(e);
		}
	  };
	  
	  useEffect(() => {
		fetchResults();
	  });

	return (	
		<>
		<NavigationMain offCanvasPlacement="end" />
		<div className="SearchPageHeader">
			<Container>
				<div className="search_page--page-title">
					<h1>Search: "{searchQuery}" </h1>
				</div>
			</Container>

		<div className="Title_Results">
			<Container>
				<div className="search__page--title-results bg-light">
					<h1>Titles: </h1>
					<TitleList movies={titles} />
				</div>
			</Container>
		</div>

		<div className="Person_Results">
			<Container>
				<div className="search__page--person-results bg-light">
					<h1>People: </h1>
					<PersonList movies={mockedPersons} />
				</div>
				
			</Container>
		</div>
	</div>
	<Footer/>
	</>
	);
}
