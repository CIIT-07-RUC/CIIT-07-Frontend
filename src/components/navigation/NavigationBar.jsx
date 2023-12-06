import './index.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function NavigationBar() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
		<Container fluid>
		  <Navbar.Brand href="#">ImdbCheapClone</Navbar.Brand>
		  <Navbar.Toggle aria-controls="navbarScroll" />
		  <Navbar.Collapse id="navbarScroll">
			<div className="navigation__content--wrapper justify-content-between d-flex w-100">
			
				<div className="search__inner w-100 px-5">
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
				</div>
				
				<Nav
				className="w-100 justify-content-end"
				navbarScroll
				>
					<Nav.Link href="#action2">Sing In</Nav.Link>
					<Nav.Link href="#action2">Sing Up</Nav.Link>

				</Nav>
			</div>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>
	);
}