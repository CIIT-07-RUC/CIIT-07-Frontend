import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import MovieList from '../components/movieList/MovieList';
import { Footer } from '../components/footer/Footer';
import img1 from '../assets/images/movie2.jpeg';
import { NavigationMain } from '../components/navigation/NavigationMain';

export function CastPage(props) {
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
					<h1>(Cast Name)</h1>
					<p>Primary profession: <strong> (Actor)</strong></p>
					<p>Birth year: <strong> (1940)</strong></p>
				</div>
				<MovieList movies={mockedMovies} />
				</Container>
			</div>
			<Footer/>

		</>
	)
}