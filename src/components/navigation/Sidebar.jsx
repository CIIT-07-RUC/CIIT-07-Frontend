import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import {  Bookmark, Gear } from 'react-bootstrap-icons';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';



export function Sidebar(props) {


	return(
		<>
		  <Offcanvas show={props.showSidebar} onHide={props.handleClose} bg="dark" data-bs-theme="dark"  placement={props.offCanvasPlacement}>
				<Offcanvas.Header closeButton>
				<Offcanvas.Title>ImdbCheapClone Sidebar</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
				<Nav className="flex-column">
				<Link to="/account">
					<Gear />
					<span style={{marginLeft: '10px' }}> Account </span>
				</Link>
				<Link to="/bookmarks" href="#Bookmark">
					<Bookmark/>
					<span style={{marginLeft: '10px' }}> Bookmark </span>
				</Link>
				</Nav>
				</Offcanvas.Body>
      		</Offcanvas>
		</>
	)
}