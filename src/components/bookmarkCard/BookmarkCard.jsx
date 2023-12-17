import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import img1 from '../../assets/images/movie2.jpeg';
import './index.scss';
import Accordion from 'react-bootstrap/Accordion';

export function BookmarkCard(props){
	return(
	<>
	<Card className='card__item mt-3'>
		<Card.Img 
		className="card__item--image"
		variant="top" 
		src={img1} />
		<Card.Body className="card__body">
			<Card.Title className='text-center' >Movie title</Card.Title>
			<Card.Text className='text-center' style={{fontStyle: 'italic'}}>
				Added: 13.12.2099
			</Card.Text>
			<Card.Text>
			<Accordion >
				<Accordion.Item eventKey="0">
					<Accordion.Header>Your bookmark comment</Accordion.Header>
					<Accordion.Body>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Add comment to bookmark </Accordion.Header>
					<Accordion.Body>
					
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Other actions </Accordion.Header>
					<Accordion.Body>
						<Button className='mb-2' variant='danger'>Remove bookmark</Button>
						<Button variant='warning'>Update bookmark</Button>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			</Card.Text>
			<Button href='' >Check movie</Button>
		</Card.Body>
				
	</Card>
	</>
	);
}