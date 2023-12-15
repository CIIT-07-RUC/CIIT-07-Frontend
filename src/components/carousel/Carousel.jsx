import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';
import { Button } from 'react-bootstrap';

export function CCarousel (props) {
	return(
		<>
			<h4 className='carousel__title'>{ props.title }</h4>
			<Carousel className='carousel__component' data-bs-theme="dark">
				{
					props.items.map((el, key) => (
						<Carousel.Item className='carousel__item'>
							<Card className='card__item'>
								<Card.Img 
								className="card__item--image"
								variant="top" 
								src={el.poster} />
								<Card.Body className="card__body">
									<Card.Title >{el.primaryTitle}</Card.Title>
									<Card.Text>
										{el.plot}
									</Card.Text>
									<Button href={`/movie/${el.tConst}`} >Check movie</Button>
								</Card.Body>
								
							</Card>
						</Carousel.Item>
					))
				}
			</Carousel>
		</>
	)
}