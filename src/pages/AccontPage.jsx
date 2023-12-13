import { Footer } from '../components/footer/Footer';
import { NavigationBar } from '../components/navigation/NavigationBar';
import { Row, Container, InputGroup , Col   } from 'react-bootstrap';
import { NavigationMain } from '../components/navigation/NavigationMain';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState, useContext, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ThemeContext } from '../index';
import { UsersAPI } from '../apis/UsersAPI';


function AccountPage() {
	const [validated, setValidated] = useState(false);
	const [userData, setUserData] = useState({});

	const [updatedEmail, setUpdatedEmail] = useState('');
	const [updatedFName, setUpdatedFName] = useState('');
	const [updatedUserName, setUpdatedUserName] = useState('');
	const [updatedLName, setUpdatedLName] = useState('');
	const [updatedPhone, setUpdatedPhone] = useState('');

	const { userId, setUserId}  = useContext(ThemeContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
	  const form = event.currentTarget;


		try {
			if (userId) {
			const addInformationUserInformationBody = {
				userName: 'sada',
				firstName: "string",
				lastName: "string",
				phone: "string"
			}

			const updateUserInformationBody = {
				email: 'matustest0@test.com',
				phone: ""
			};

			const addInformationUserInformationBodyJson = JSON.stringify(addInformationUserInformationBody);
			const result = await UsersAPI.addInformation(userId,addInformationUserInformationBody );
			console.log("result", result)
			} else {
				console.log("BRASKO POCKAJ")
			}
		}
		catch (e) {
		console.error('Fetching failed!', e);
		}

	
	  if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
	  }

	  setValidated(true);
	};

	const fetchUserData = async () => {
		try {
			if (userId) {
				const result = await UsersAPI.getById(userId);
				console.log("User--data", result);
				setUpdatedEmail(result.email);
				setUpdatedPhone(result.phone);
				setUpdatedUserName(result.userName);
				setUpdatedLName(result.firstName);
				setUpdatedFName(result.lastName);
				setUserData(result);

			  } else {
			  }
		  }
		  catch (e) {
			console.error('Fetching failed!', e);
		  }
	}

	useEffect(() => {
		fetchUserData();
	}, [userId])
	console.log("userData", userData)

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
					{
						Object.keys(userData).length > 0 ?
						<div className='user-data__overview'>
							<div>
								<span className='highlighted'>Email: </span>
								<>
									{userData.email !== null ?  
									<span>
									{userData.email}
									</span>
									: 
									<span className='data-missing'>
										Data for First name are missing
									</span>
									}
								</>							</div>
							<div>
								<span className='highlighted' >First name:</span>
								<>
									{userData.firstName !== null ?  
									<span>
									{userData.firstName}
									</span>
									: 
									<span className='data-missing'>
										Data for Last name are missing
									</span>
									}
								</>

							</div>
							<div>
								<span className='highlighted'> Last name:</span>
								<>
									{userData.lastName !== null ?  
									<span>
									{userData.lastName}
									</span>
									: 
									<span className='data-missing'>
										Data for Last name are missing
									</span>
									}
								</>							
							</div>
							<div>
								<span className='highlighted'>User name:</span>
								<>
									{userData.userName !== null ?  
									<span>
									{userData.userName}
									</span>
									: 
									<span className='data-missing'>
										Data for User name are missing
									</span>
									}
								</>							
							</div>
							<div>
								<span className='highlighted'>Phone:</span>
								<>
									{userData.phone !== null ?  
									<span>
									{userData.phone}
									</span>
									: 
									<span className='data-missing'>
										Data for Phone are missing
									</span>
									}
								</>							
							</div>
						</div>
						: null
					}

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
								disabled={updatedFName !== null ?  true:  false}
								defaultValue={updatedFName}
								onChange={e => setUpdatedFName(e.target.value)}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" sm="12"  controlId="validationLName">
							<Form.Label>Last name</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Last name"
								disabled={updatedLName !== null ?  true:  false}
								defaultValue={updatedLName}
								onChange={e => setUpdatedLName(e.target.value)}

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
								defaultValue={updatedEmail}
								onChange={e => setUpdatedEmail(e.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
								Please choose a username.
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group as={Col} md="6" sm="12"  controlId="validationCustomUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control 
								type="text" 
								disabled={updatedUserName !== null ?  true:  false}
								defaultValue={updatedUserName}
								onChange={e => setUpdatedUserName(e.target.value)}
								placeholder="Username" />
							<Form.Control.Feedback type="invalid">
							</Form.Control.Feedback>
						</Form.Group>

						</Row>

						<Row className="mb-3">
						<Form.Group as={Col} md="6" sm="12" controlId="validationPhone">
							<Form.Label>Phone</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
								type="text"
								defaultValue={updatedPhone}
								onChange={e => setUpdatedPhone(e.target.value)}
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