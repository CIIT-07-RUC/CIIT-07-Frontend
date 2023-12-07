import Carousel from 'react-bootstrap/Carousel';
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
			<Carousel className='carousel__component' data-bs-theme="dark">
				<h2 className='carousel__title'>{ props.title }</h2>
				{
					(items).map((item, index) => (

						<Carousel.Item className='carousel__item'>
							<img
							className="carousel__item--image"
							src={item.img}
							alt="First slide"
							/>
							<Carousel.Caption>
							<h5>{item.title}</h5>
							<p>{item.description}</p>
							</Carousel.Caption>
						</Carousel.Item>
					))
				}
			</Carousel>
		</>
	)
}