import { NavigationBar } from "./NavigationBar";
import { Sidebar } from "./Sidebar";
import { useState } from 'react';

export function NavigationMain(props) {
	const [showSidebar, setShowSidebar] = useState(false);
	const handleClose = () => setShowSidebar(false);
	const handleShow = () => setShowSidebar(true);

	return(
	<>
		<NavigationBar handleShow={handleShow} />
		<Sidebar showSidebar={showSidebar} handleClose={handleClose} offCanvasPlacement={props.offCanvasPlacement}  />
	</>
	)
}