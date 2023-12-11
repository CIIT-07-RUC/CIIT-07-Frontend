import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import UsersAPI from '../../apis/UsersAPI';

export function Login({ showLogin, showRegister, login, register, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await UsersAPI.login(email, password);
      sessionStorage.setItem('token', result.token);
      console.log(result);
    }
    catch (e) {
      console.error('Login failed');
    }
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

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">Sign in</Button>
        </div>
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
