import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/images/movie2.jpeg';

export function CCarousel (props) {
	return(
		<>
			<Carousel data-bs-theme="dark">
				<Carousel.Item>
					<img
					className="d-block w-100"
					src={img1}
					alt="First slide"
					/>
					<Carousel.Caption>
					<h5></h5>
					<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
					className="d-block w-100"
					src={img1}
					alt="Second slide"
					/>
					<Carousel.Caption>
					<h5></h5>
					<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
					className="d-block w-100"
					src={img1}
					alt="Third slide"
					/>
					<Carousel.Caption>
					<h5></h5>
					<p>
					</p>
					</Carousel.Caption>
				</Carousel.Item>
				</Carousel>
		</>
	)
}