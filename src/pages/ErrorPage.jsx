import { Footer } from '../components/footer/Footer';
import { NavigationBar } from '../components/navigation/NavigationBar';
import img1 from '../assets/images/404_image.png';
import { Row, Container, Col   } from 'react-bootstrap';
import { NavigationMain } from '../components/navigation/NavigationMain';

export function ErrorPage(props) {
	return (
	<>
	<NavigationMain offCanvasPlacement="end" />
	<div className="404__page">
		<Container>
			<Row>
				<Col>
				<img src={img1} style={{ width: '100%'}} />
				</Col>
				<Col style={{ textAlign: 'center'}}>
					<div className="page404--content--wrapper">
						<h1>404 - Oopsie</h1>
						<h5>Page you tried to find does not exist </h5>
						<h1>Yet</h1>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
	<Footer/>
	</>
	);
}