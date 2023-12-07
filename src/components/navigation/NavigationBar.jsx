import './index.scss';

import { useState } from 'react';
import { Row, Paragraph } from 'react-bootstrap';
import { List, Bookmark, Gear } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Login } from '../login/Login';

export function NavigationBar(props) {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


	return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className=" px-lg-3">
        <Container fluid>
          <Navbar.Brand href="#">ImdbCheapClone</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Row className="navigation__content--wrapper align-items-center justify-content-between d-flex w-100">

            <Row className="search__inner w-100 px-5">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Row>

            <Nav
            className="w-100 justify-content-end align-items-center"
            navbarScroll
            >
              <div className='d-flex flex-row flex-row w-100'>
              <Nav.Link onClick={login}>Sign In</Nav.Link>
              <Nav.Link onClick={register}>Sign Up</Nav.Link>
              </div>
              <div>
              <Nav.Link  className='w-100' href="">
                <List variant="primary" onClick={handleShow} size={30}/>
              </Nav.Link>
              </div>
            </Nav>
          </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} bg="dark" data-bs-theme="dark"  placement={props.offCanvasPlacement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ImdbCheapClone Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link  href="#Account">
            <Gear />
            <span style={{marginLeft: '10px' }}> Account </span>
          </Nav.Link>
          <Nav.Link href="#Bookmark">
            <Bookmark/>
            <span style={{marginLeft: '10px' }}> Bookmark </span>
          </Nav.Link>
        </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Login showLogin={showLogin} showRegister={showRegister} login={login} register={register} closeModal={closeModal} />
    </>
	);
}
