import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import UsersAPI from '../../apis/UsersAPI';

export function Login({ showLogin, showRegister, login, register, closeModal }) {
  // LOGIN RELATED STATES:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginEmailInvalid, setIsLoginEmailInvalid] = useState(false);
  const [isLoginPasswordInvalid, setIsLoginPasswordInvalid] = useState(false);
  const [isLoginSuccesfull, setIsLoginSuccesfull] = useState(undefined);
  const [loginNotSuccesfullErrMsg, setLoginNotSuccesfullErrMsg] = useState('');

  // REGISTER RELATED STATES:
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

  const [isRegisterEmailInvalid, setIsRegisterEmailInvalid] = useState(false);
  const [isRegisterPasswordInvalid, setIsRegisterPasswordInvalid] = useState(false);
  const [isRegisterRepeatPasswordInvalid, setIsRegisterRepeatPasswordInvalid] = useState(false);
  const [isRegisterSuccesfull, setIsRegisterSuccesfull] = useState(undefined);
  const [registerSuccesfullMsg, setRegisterSuccesfullMsg] = useState('');


  const doLogin = async (e) => {
    e.preventDefault();
    setIsLoginEmailInvalid(false);
    setIsLoginPasswordInvalid(false);
    const isEmailValidResult = isEmailValid('LOGIN', email);
    const isPasswordValidResult = isPasswordValid('LOGIN', password);
    if(!isEmailValidResult || !isPasswordValidResult) return;
    try {
      const result = await UsersAPI.login(email, password);
      sessionStorage.setItem('token', result.token);
      setIsLoginSuccesfull(true);
      console.log(result);
    }
    catch (e) {
      console.error('Login failed', e.response.data);
      setLoginNotSuccesfullErrMsg(e.response.data);
      setIsLoginSuccesfull(false);

    }
  }

  const isEmailValid = (inputType, email) => {
    var emailRegexValidation = /\S+@\S+\.\S+/;
    if (!emailRegexValidation.test(email) && email.length < 5 ) {
      if (inputType === 'LOGIN') {
        setIsLoginEmailInvalid(true);
        return false;
      }
      else if (inputType === 'REGISTER'){
        setIsRegisterEmailInvalid(true);
        return false;
      }
    }
    return true;
  }

  const isPasswordValid = (inputType, password) => {
    if (password.length < 5) {
      if (inputType === 'LOGIN') {
        setIsLoginPasswordInvalid(true);
        return false;
      }
      else if (inputType === 'REGISTER'){
        setIsRegisterPasswordInvalid(true);
        return false;
      }
    }

    if (inputType === 'REGISTER' && registerPassword !== registerRepeatPassword ) {
      setIsRegisterRepeatPasswordInvalid(true);
      return false;
    }
    return true;
  }

  const doSignup = async (e) => {
    e.preventDefault();
    setIsRegisterEmailInvalid(false);
    setIsRegisterPasswordInvalid(false);
    setIsRegisterRepeatPasswordInvalid(false);

    const isEmailValidResult = isEmailValid('REGISTER', registerEmail);
    const isPasswordValidResult = isPasswordValid('REGISTER', registerPassword);

    if(!isEmailValidResult || !isPasswordValidResult) return;

    try {
      console.log("SUCCESS")
      const result = await UsersAPI.register(registerEmail, registerPassword, registerRepeatPassword);
      setIsRegisterSuccesfull(result.isRegistrationSuccessful);
      setRegisterSuccesfullMsg(result.responseMessage);
      console.log("SUCCESS result", result);

      console.log(result);
    }
    catch (e) {
      setIsRegisterSuccesfull(false);
      console.error('Signup failed', e);
    }
  }

  const renderLoginForm = () => {
    return (
      <Form onSubmit={e => doLogin(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email address"
            value={email}
            isInvalid={ isLoginEmailInvalid ? true : false }
            onChange={e => setEmail(e.target.value)}
          />
          { isLoginEmailInvalid ? 
          <Form.Control.Feedback type="invalid">
              Please write valid email address.
          </Form.Control.Feedback>
         : false }

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            isInvalid={ isLoginPasswordInvalid ? true : false }
            onChange={e => setPassword(e.target.value)}
          />
          { isLoginPasswordInvalid ? 
          <Form.Control.Feedback type="invalid">
              Password must be longer than 5 characters
          </Form.Control.Feedback>
         : false }
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
          </Col>
          <Col className="text-end">
            <a href="#forgot-password">Forgot password?</a>
          </Col>
        </Row>
        {isLoginSuccesfull === false && (
          <Alert variant="danger">
            {loginNotSuccesfullErrMsg}
          </Alert>
        )}
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">Sign in</Button>
        </div>
        {isLoginSuccesfull && (
          <Alert variant="success">
            You are succesfully logged in
          </Alert>
        )}
      </Form>
    );
  };

  const renderRegisterForm = () => {
    return (
      <Form onSubmit={e => doSignup(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email address"
            value={registerEmail}
            isInvalid={ isRegisterEmailInvalid ? true : false }
            onChange={e => setRegisterEmail(e.target.value)}
          />

        { isRegisterEmailInvalid ? 
          <Form.Control.Feedback type="invalid">
              Please write valid email address.
          </Form.Control.Feedback>
         : false }
      
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={registerPassword}
            isInvalid={ isRegisterPasswordInvalid ? true : false }
            onChange={e => setRegisterPassword(e.target.value)}
          />
         { isRegisterPasswordInvalid ? 
          <Form.Control.Feedback type="invalid">
              Password must be longer than 5 characters
          </Form.Control.Feedback>
         : false }
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Control 
            type="password" 
            value={registerRepeatPassword}
            isInvalid={ isRegisterRepeatPasswordInvalid ? true : false }
            onChange={e => setRegisterRepeatPassword(e.target.value)}
            placeholder="Repeat password" />

          { isRegisterRepeatPasswordInvalid ? 
          <Form.Control.Feedback type="invalid">
              Passwords do not match
          </Form.Control.Feedback>
         : false }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I have read and agree to the terms" />
        </Form.Group>

        {isRegisterSuccesfull === false && (
          <Alert variant="danger">
            User with this name already exists! Choose different one!
          </Alert>
        )}

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">Sign up</Button>
        </div>

        {isRegisterSuccesfull && (
          <Alert variant="success">
            {registerSuccesfullMsg}
          </Alert>
        )}
      </Form>
      
    );
  };

  return (
    <Modal show={showLogin || showRegister} onHide={closeModal}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
          <Button variant={showLogin ? 'primary' : 'light'} onClick={login} className="mx-2">Login</Button>
          <Button variant={showRegister ? 'primary' : 'light'} onClick={register} className="mx-2">Register</Button>
        </div>
        {showLogin ? renderLoginForm() : null}
        {showRegister ? renderRegisterForm() : null}
      </Modal.Body>
    </Modal>
  );
}
