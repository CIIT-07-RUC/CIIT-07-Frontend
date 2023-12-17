import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import MovieList from '../components/movieList/MovieList';
import { Footer } from '../components/footer/Footer';
import movieNotFoundImg from '../assets/images/movie_not_found.jpeg';
import { NavigationMain } from '../components/navigation/NavigationMain';
import React, {useEffect, useState} from 'react';
import {CastAPI} from '../apis/CastAPI';
import { MovieAPI } from '../apis/MovieAPI';
import { CastList } from '../components/castList/CastList';
import { useHistory ,useLocation } from 'react-router-dom';

import { BookmarkCard } from '../components/bookmarkCard/BookmarkCard';


export function BookmarksPage (props) {
	const location = useLocation();
	
	return (
		<>
			<NavigationMain offCanvasPlacement="end" />
				<Container className='bookmarks__page mt-5'>
					<h3>Bookmarks</h3>
					<Row>
						<Col lg="4" md="6" sm="12">
							<BookmarkCard/>
						</Col>
					</Row>
					
				</Container>
			<Footer/>
		</>
	)
}