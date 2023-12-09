import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import img1 from '../assets/images/movie2.jpeg';
import img2 from '../assets/images/movie1.webp';


export function IndexPage() {
	const mockedMovieObj = {
		items: {
			img: [img2, img1, img1],
			title: ["Title 1", "Title 2", "Title 3"],
			description: ["Lorem ipsum dolor sit amet1", "Lorem ipsum dolor sit amet2", "Lorem ipsum dolor sit amet3"]
		}
	}
	

	return (
	  <div className="">
			<Container>
				<Row style={{margin: '50px 0'}}>
					<Col><CCarousel items={mockedMovieObj} title="Fresh movies" /></Col>
					<Col><CCarousel items={mockedMovieObj} title="Fresh actors" /></Col>
				</Row>
			</Container>
	  </div>
	);
}