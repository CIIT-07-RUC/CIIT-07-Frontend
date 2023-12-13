import { Footer } from '../components/footer/Footer';
import { NavigationBar } from '../components/navigation/NavigationBar';
import { Row, Container, InputGroup , Col   } from 'react-bootstrap';
import { NavigationMain } from '../components/navigation/NavigationMain';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function AccountPage() {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
	  const form = event.currentTarget;
	  if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
	  }
  
	  setValidated(true);
	};

  return (
	<>
	<NavigationMain offCanvasPlacement="end" />
	<Container className='account-settings__page mt-5'>
		<Tabs
		defaultActiveKey="overview"
		id="uncontrolled-tab-example"
		className="mb-3"
		>
			<Tab eventKey="overview" title="Overview" >
				<div className="edit__settings--wrapper bg-light">
					<div className="text--content__wrapper">
						<h2>Account Overview</h2>
					</div>
				</div>
			</Tab>
			<Tab eventKey="edit-settings" title="Edit settings">
				<div className="edit__settings--wrapper bg-light">
					<div className="text--content__wrapper">
						<h2>Edit settings</h2>
						<p className='mb-5'>You are free to change account settings! </p>
					</div>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Row className="mb-3">
							<Form.Group as={Col} md="6" sm="12" controlId="validationFName">
							<Form.Label>First name</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="First name"
								defaultValue="Mark"
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" sm="12"  controlId="validationLName">
							<Form.Label>Last name</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Last name"
								defaultValue="Otto"
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
						
						</Row>
						<Row className="mb-3">
						<Form.Group as={Col} md="6" sm="12" controlId="validationCustomUsername">
							<Form.Label>Email</Form.Label>
							<InputGroup hasValidation>
								<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
								<Form.Control
								type="text"
								placeholder="test@test.com"
								aria-describedby="inputGroupPrepend"
								required
								/>
								<Form.Control.Feedback type="invalid">
								Please choose a username.
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group as={Col} md="6" sm="12"  controlId="validationCustomUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control type="text" placeholder="Username" required />
							<Form.Control.Feedback type="invalid">
							</Form.Control.Feedback>
						</Form.Group>

						</Row>

						<Row className="mb-3">
						<Form.Group as={Col} md="6" sm="12" controlId="validationPhone">
							<Form.Label>Phone</Form.Label>
							<InputGroup hasValidation>
								<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
								<Form.Control
								type="text"
								placeholder="+45 xxx xxx xxx"
								aria-describedby="inputGroupPrepend"
								required
								/>
								<Form.Control.Feedback type="invalid">
									Please choose a username.
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>

						</Row>
						<div className="button__wrapper d-flex justify-content-center">
							<Button type="submit">Submit form</Button>
						</div>
					</Form>
				</div>
			</Tab>
			<Tab eventKey="visibility" title="Visiblity">
			</Tab>
			<Tab eventKey="admin" title="Admin" disabled>
			</Tab>
	  </Tabs>
		
	</Container>
	<Footer/>
	</>

  );
}

export default AccountPage;