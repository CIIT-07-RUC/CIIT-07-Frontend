import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import img1 from '../assets/images/404_image.png';
import { NavigationMain } from '../components/navigation/NavigationMain';
import { Footer } from '../components/footer/Footer';
import MovieList from '../components/movieList/MovieList';
import PersonList from '../components/searchResultsList/PersonList';
import TitleList from '../components/searchResultsList/TitleList';


export function SearchPage(props) {

	const mockedPersons = [
		{ id: 1, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
		{ id: 2, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
		{ id: 3, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
		{ id: 4, name: 'Leonardo Dicaprio', proffesion: 'Actor', birthYear: '1974'},
	];
	const mockedMovies = [
		{ id: 1, name: 'Movie 1', image: img1},
		{ id: 2, name: 'Movie 2', image: img1},
		{ id: 3, name: 'Movie 3', image: img1},
		{ id: 4, name: 'Movie 4', image: img1},
	];

	const mockedSearchQuery = "leonardo";
	
	const mockedMovieObj = {
		items: {
			img: [img1],
			title: ["Title 1"],
			year: ["year"],
			description: ["Lorem ipsum dolor sit amet1"]
		}
	}

	const mockedPersonObj = {
		items: {
			name: ["Leonardo DiCaprio"],
			proffesion: ["Actor"],
			birthYear: ["1974"]
		}
	}

	return (	
		<>
		<NavigationMain offCanvasPlacement="end" />
		<div className="SearchPageHeader">
			<Container>
				<div className="search_page--page-title">
					<h1>Search: "{mockedSearchQuery}" </h1>
				</div>
			</Container>

		<div className="Title_Results">
			<Container>
				<div className="search__page--title-results bg-light">
					<h1>Titles: </h1>
					<TitleList movies={mockedMovies} />
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
