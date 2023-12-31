import { NavigationBar} from '../components/navigation/NavigationBar';
import { CCarousel } from '../components/carousel/Carousel';
import { Row, Container, Col   } from 'react-bootstrap';
import MovieList from '../components/movieList/MovieList';
import { Footer } from '../components/footer/Footer';
import movieNotFoundImg from '../assets/images/movie_not_found.jpeg';
import { NavigationMain } from '../components/navigation/NavigationMain';
import React, {useEffect, useState, useContext} from 'react';
import {CastAPI} from '../apis/CastAPI';
import { MovieAPI } from '../apis/MovieAPI';
import { CastList } from '../components/castList/CastList';
import { useHistory ,useLocation } from 'react-router-dom';
import { BookmarksAPI } from '../apis/BookmarksAPI';
import { ThemeContext } from '../index';


import { BookmarkCard } from '../components/bookmarkCard/BookmarkCard';


export function BookmarksPage (props) {

	const [bookmarks, setBookmarks] = useState([]);
	const [bookmarksLength, setBookmarksLength] = useState(0);

	const [areBooksmarksLoaded, setAreBooksmarksLoaded] = useState(false)
	const location = useLocation();
	const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);

	const fetchBookmarks = async () => {
		try {
			const token = sessionStorage.getItem('token');
			const result = await BookmarksAPI.getAll();
			setBookmarks(result.items);
			setBookmarksLength(result.totalItems)
			setAreBooksmarksLoaded(true)
		} catch (e) {
			console.warn("er:", e)
		}
	}

	useEffect(() => {
		fetchBookmarks();
	}, []);

	if (!isUserLoggedIn) {
		return (
		  <div>
			<p>You need to be logged in to access this page.</p>
		  </div>
		);
	  }
	
	return (
		<>
			<NavigationMain offCanvasPlacement="end" />
				<Container className='bookmarks__page mt-5'>
					
					<h3>Bookmarks</h3>
					<Row>
						{ areBooksmarksLoaded?
						bookmarksLength === 0 ? 
							<p>No bookmarks found for this account</p>
							: 
							bookmarks.map((bookmark) => (
								<Col lg="4" md="6" sm="12">
									<BookmarkCard item={bookmark} />
								</Col>
							))
							: null
						}
					</Row>

				</Container>
			<Footer/>
		</>
	)
}