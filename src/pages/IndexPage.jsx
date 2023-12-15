import { NavigationMain} from '../components/navigation/NavigationMain';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import img1 from '../assets/images/movie2.jpeg';
import img2 from '../assets/images/movie1.webp';
import { Footer } from '../components/footer/Footer';
import React, {useEffect, useState} from 'react';
import { MovieAPI } from '../apis/MovieAPI';


export function IndexPage() {

	const freshMoviesArr = ['tt26316979', 'tt23952060', 'tt22207772']
	const recommendedMoviesArr = ['tt4285496', 'tt4434004', 'tt4846340 '];
	const [areMoviesLoaded, setAreMoviesLoaded] = useState(false);
	const [recommendedMovies, setRecommendedMovies] = useState([]);
	const [freshMovies, setFeshMovies] = useState([]);

	useEffect(() => {
			fetchMovie();
		if (areMoviesLoaded) {
			console.log("recommendedMovies", recommendedMovies)
		}
	}, [areMoviesLoaded]);

	const fetchMovie = async () => {
		try {

			const recommendedMoviesData = await Promise.all(
				recommendedMoviesArr.map(async (el) => {
				  const castMovie = await MovieAPI.getById(el);
				  return castMovie;
				})
			);

			const freshMoviesData = await Promise.all(
				freshMoviesArr.map(async (el) => {
					const castMovie = await MovieAPI.getById(el);
					return castMovie;
				})
			);
			
			setRecommendedMovies([ ...recommendedMoviesData]);
			setFeshMovies([ ...freshMoviesData]);
			setAreMoviesLoaded(true);


		} catch (e) {
			
		}
	}





	return (
		<>
			<NavigationMain offCanvasPlacement="end" />
			<div className="">
					<Container>
						<Row style={{margin: '50px 0'}}>
							{ areMoviesLoaded ?
							<Col><CCarousel items={recommendedMovies} title="Recommended movies by us" /></Col>
							: null }

							{ areMoviesLoaded ?
							<Col><CCarousel items={freshMovies} title="Fresh movies from this year" /></Col>
							: null }
						</Row>
					</Container>
			</div>
			<Footer/>
		</>

	);
}