import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import UsersAPI from '../../apis/UsersAPI';

export function Login({ showLogin, showRegister, login, register, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginEmailInvalid, setIsLoginEmailInvalid] = useState(false);
  const [isLoginPasswordInvalid, setIsLoginPasswordInvalid] = useState(false);
  const [isLoginSuccesfull, setIsLoginSuccesfull] = useState(undefined);
  const [loginNotSuccesfullErrMsg, setLoginNotSuccesfullErrMsg] = useState('');

  const doLogin = async (e) => {
    e.preventDefault();
    setIsLoginEmailInvalid(false);
    setIsLoginPasswordInvalid(false);
    const isEmailValidResult = isEmailValid('LOGIN');
    const isPasswordValidResult = isPasswordValid('LOGIN');
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

  const isEmailValid = (inputType) => {
    var emailRegexValidation = /\S+@\S+\.\S+/;
    if (!emailRegexValidation.test(email) && email.length < 5 ) {
      if (inputType === 'LOGIN') {
        setIsLoginEmailInvalid(true);
        return false;
      }
    }
    return true;
  }

  const isPasswordValid = (inputType) => {
    if (password.length < 5) {
      if (inputType === 'LOGIN') {
        setIsLoginPasswordInvalid(true);
        return false;
      }
    }
    return true;
  }

  const doSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await UsersAPI.register(email, password);
      console.log(result);
    }
    catch (e) {
      console.error('Signup failed');
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
            required
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
            required
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
      
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Control type="password" placeholder="Repeat password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I have read and agree to the terms" />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">Sign up</Button>
        </div>
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
