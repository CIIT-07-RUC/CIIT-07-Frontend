import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import img1 from '../assets/images/404_image.png';
import { NavigationMain } from '../components/navigation/NavigationMain';
import { Footer } from '../components/footer/Footer';


export function SearchPage(props) {

	const mockedSearchQuery = "leonardo";
	
	const mockedMovieObj = {
		items: {
			img: [img1, img1, img1],
			title: ["Title 1", "Title 2", "Title 3"],
			description: ["Lorem ipsum dolor sit amet1", "Lorem ipsum dolor sit amet2", "Lorem ipsum dolor sit amet3"],
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
					<p> result_1: <strong> Title </strong> (year: 2010)</p>
					<p> result_2: <strong> Title </strong> (year: 2000)</p>
					<p> result_3: <strong> Title </strong> (year: 1998)</p>
				</div>
			</Container>
		</div>

		<div className="Person_Results">
			<Container>
				<div className="search__page--person-results bg-light">
					<h1>People: </h1>
					<p> result_1: <strong> Name </strong> (birth year: 1974)</p>
				</div>
			</Container>
		</div>
	</div>
	<Footer/>
	</>
	);
}
