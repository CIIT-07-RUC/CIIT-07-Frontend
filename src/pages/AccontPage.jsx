import { Footer } from '../components/footer/Footer';
import { NavigationBar } from '../components/navigation/NavigationBar';
import { Row, Container, InputGroup , Col, Alert   } from 'react-bootstrap';
import { NavigationMain } from '../components/navigation/NavigationMain';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState, useContext, useEffect, Redirect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ThemeContext } from '../index';
import { UsersAPI } from '../apis/UsersAPI';
import { useNavigate } from 'react-router-dom';


function AccountPage() {
	const [validated, setValidated] = useState(false);
	const [userData, setUserData] = useState({});

	const navigate = useNavigate();

	const [updatedEmail, setUpdatedEmail] = useState('');
	const [updatedFName, setUpdatedFName] = useState('');
	const [updatedUserName, setUpdatedUserName] = useState('');
	const [updatedLName, setUpdatedLName] = useState('');
	const [updatedPhone, setUpdatedPhone] = useState('');
	const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);

	const [isAccountDeactivated, setIsAccountDeactivated] = useState(false);
	const [deactivatedAccountMsg, setDeactivatedAccountMsg] = useState('');

	const [loadingDone, setLoadingDone] = useState(false);

	const { userId, setUserId}  = useContext(ThemeContext);

	const handleSubmit = async (event) => {
	  event.preventDefault();
	  const form = event.currentTarget;


		try {
			if (userId) {
			const userName = updatedUserName === userData.userName ? userData.userName : updatedUserName;
			const firstName = updatedFName === userData.firstName ? userData.firstName : updatedFName;
			const lastName = updatedLName === userData.lastName ? userData.lastName : updatedLName;
			const phone = updatedPhone === userData.phone ? userData.phone : updatedPhone;
			const email = updatedEmail === userData.email ? userData.email : updatedEmail;

			const addInformationUserInformationBody = {
				userName: userName,
				firstName: firstName,
				lastName: lastName,
				phone: phone
			}

			const updateUserInformationBody = {
				email: email,
				phone: phone
			};

			const addInformationUserInformationBodyJson = JSON.stringify(addInformationUserInformationBody);
			const token = sessionStorage.getItem('token');
			 await UsersAPI.addInformation(addInformationUserInformationBodyJson, token );
			 await UsersAPI.updateUser(userId,updateUserInformationBody );
			} else {
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

	const deactivateAccount = async (e) => {
		try{
			if (userId) {
				const token = sessionStorage.getItem('token');
				const result = await UsersAPI.deactivateAccount(token);
				setIsAccountDeactivated(true);
				setDeactivatedAccountMsg(result);

				setTimeout(() => {
					setIsUserLoggedIn(false);
					setUserId(-1);
					sessionStorage.removeItem('token');
					navigate(`/`, {replace:true});
				}, 3000);
			}
		}
		catch (e) {
			console.warn("Error", e)
		}
	};

	const fetchUserData = async () => {
		try {
		  if (userId) {
			const result = await UsersAPI.getById(userId);
			setUpdatedEmail(result.email);
			setUpdatedPhone(result.phone);
			setUpdatedUserName(result.userName);
			setUpdatedLName(result.firstName);
			setUpdatedFName(result.lastName);
			setUserData(result);
			setLoadingDone(true);
		  } else {
		  }
		} catch (e) {
		  console.error('Fetching failed!', e);
		  setLoadingDone(false); 
		}
	  };
	  
	  useEffect(() => {
		fetchUserData();
	  }, [loadingDone, userId]);
	  

	

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
						 loadingDone ?
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
						:       <p>Loading...(refresh page)</p>

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
								disabled={userData.firstName !== null ?  true:  false}
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
								disabled={userData.lastName !== null ?  true:  false}
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
								Please choose valid email.
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group as={Col} md="6" sm="12"  controlId="validationCustomUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="User name"
								disabled={userData.lastName !== null ?  true:  false}
								defaultValue={updatedUserName}
								onChange={e => setUpdatedUserName(e.target.value)}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						</Form.Group>

						</Row>

						<Row className="mb-3">
						<Form.Group as={Col} md="6" sm="12" controlId="validationPhone">
							<Form.Label>Phone</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
								type="number"
								defaultValue={updatedPhone}
								onChange={e => setUpdatedPhone(e.target.value)}
								aria-describedby="inputGroupPrepend"
								required
								/>
								<Form.Control.Feedback type="invalid">
									Please choose valid phone.
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
				<div className="edit__settings--wrapper bg-light">
					<div className="text--content__wrapper">
						<h2>Visibility overview</h2>
					</div>
					<div className="user-data__overview">
						{isAccountDeactivated && (
						<Alert variant="success">
							{deactivatedAccountMsg}
						</Alert>
						)}
						<Button className='mt-5' type="submit" variant="danger" onClick={e => deactivateAccount(e.target.value)}>Deactivate account</Button>
						<p className='mb-0 mt-2 font-weight-light'>When you click on deactivate account button, users cannot search for you</p>
						<p className='font-weight-light'>Account will not be removed. After next log-in your account will be activated</p>
					</div>
				</div>
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