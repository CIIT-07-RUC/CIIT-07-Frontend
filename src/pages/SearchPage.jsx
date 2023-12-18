import { Row, Container, Col, Card, Button } from 'react-bootstrap';
import { NavigationMain } from '../components/navigation/NavigationMain';
import { Footer } from '../components/footer/Footer';
import { useParams, useLocation } from 'react-router';
import { SearchAPI } from '../apis/SearchAPI';
import { useState, useEffect } from 'react';

export function SearchPage(props) {

	const params = useParams();
	const searchQuery = params.query;
	const [ titleResults, setTitleResults] = useState([]);
	const [ personResults, setPersonResults] = useState([]);

	const fetchTitleResults = async () => {
		try {
			setTitleResults(await SearchAPI.searchByTitle(searchQuery));
		}
		catch (e) {
		  console.error(e);
		}
	  };

	  const fetchPersonResults = async () => {
		try {
		  setPersonResults(await SearchAPI.searchByPersonName(searchQuery));	
		}
		catch (e) {
		  console.error(e);
		}
	  };

	  useEffect(() => {
		fetchTitleResults();
		fetchPersonResults();
	  }, [searchQuery]);

	return (	
		<>
		<NavigationMain offCanvasPlacement="end" />
		<div className="SearchPageHeader">
			<Container>
				<div className="search_page--page-title">
					<h1>Search: "{searchQuery}" </h1>
				</div>
			</Container>
				
		<div className="Title_Results">
			<Container>
				<div className="search__page--title-results bg-light">
				<Row md={4} lg={4}>
				<Card>
              		<Card.Body>
                		<Card.Title>Title: {titleResults.primaryTitle || 'Not Found'}  </Card.Title>
                		<Card.Text /> {titleResults.startYear} <Card.Text/>
                		<Card.Text /> {titleResults.averageRating} <Card.Text/>
                		<Card.Img  src={titleResults.poster} className="poster-picture"/>
                		<Button href={`/movie/${titleResults.tConst}`} >Check Title</Button>
              		</Card.Body>
				</Card>
				</Row>
				</div>
			</Container>
		</div>
	
		<div className="Person_Results">
			<Container>
				<div className="search__page--person-results bg-light">
				<Row md={4} lg={4}>
				<Card>
              		<Card.Body>
                		<Card.Title>Person: {personResults.primaryname}  </Card.Title>
                		<Card.Text /> {personResults.primaryprofession} <Card.Text/>
                		<Card.Text /> {personResults.birthyear} <Card.Text/>
						<Card.Text /> {personResults.deathyear} <Card.Text/>
                		<Button href={`/cast/${personResults.nconst}`} >Check Person</Button>
              		</Card.Body>
				</Card>
				</Row>
				</div>
				
			</Container>
		</div>
	</div>
	<Footer/>
	</>
	);
}
