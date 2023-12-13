import './index.scss';

import { useContext } from 'react';
import { useState } from 'react';
import { List, Bookmark, Gear } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Login } from '../login/Login';
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from './Sidebar';
import { ThemeContext } from '../../App';

export function NavigationBar(props) {

  const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);

	const closeModal = () => {
	  setShowLogin(false);
	  setShowRegister(false);
	};

	const login = () => {
		setShowLogin(true);
		setShowRegister(false);
  };
  const register = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const logout = ()=> {
    setIsUserLoggedIn(false);
    sessionStorage.removeItem('token');

  };

let navigate = useNavigate();
const routeChangeSearchPage = () =>{
    let path = '/SearchPage';
    navigate(path);
}
  

	return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className=" px-lg-3">
        <Container fluid>
          <Navbar.Brand href="/">ImdbCheapClone</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <div className="navigation__content--wrapper align-items-center justify-content-between d-flex w-100">

            <div className="search__inner w-100 px-5 d-none d-md-block">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button type = "submit" variant="outline-success"
                  onClick={routeChangeSearchPage}
                >Search</Button>
              </Form>
            </div>

            <Nav
            className="w-100 justify-content-end align-items-center"
            navbarScroll
            >
              <div className='d-flex flex-row flex-row w-100 d-none d-md-flex'>
              { !isUserLoggedIn ?
                <>
                <Nav.Link onClick={login}>Sign In</Nav.Link>
                <Nav.Link onClick={register}>Sign Up</Nav.Link>
                </>
              : 
                <Nav.Link className='warning' onClick={logout}>Logout</Nav.Link>
              }
              </div>
              <div>
              <Nav.Link  className='w-100' href="">
                <List variant="primary" onClick={props.handleShow} size={30}/>
              </Nav.Link>
              </div>
            </Nav>
          </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login showLogin={showLogin} showRegister={showRegister} login={login} register={register} closeModal={closeModal} />
    </>
	);
}
