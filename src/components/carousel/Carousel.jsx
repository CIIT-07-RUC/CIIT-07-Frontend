import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';

export function CCarousel (props) {
	const items = props.items.items.img.map((img, index) => ({
		img: props.items.items.img[index],
		title: props.items.items.title[index],
		description: props.items.items.description[index],
	}));

	return(
		<>
			<h2 className='carousel__title'>{ props.title }</h2>
			<Carousel className='carousel__component' data-bs-theme="dark">
				{
					(Object.keys(items)).map((key) => (
						<Carousel.Item className='carousel__item'>
							<Card className='card__item'>
								<Card.Img 
								className="card__item--image"
								variant="top" 
								src={items[key].img} />
								<Card.Body className="card__body">
									<Card.Title>{items[key].title}</Card.Title>
									<Card.Text>
										{items[key].description}
									</Card.Text>
								</Card.Body>
								
							</Card>
						</Carousel.Item>
					))
				}
			</Carousel>
		</>
	)
}